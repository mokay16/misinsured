"""
One-off content migration script.
Fetches each legacy MisInsured blog post from the Wayback Machine, converts
its entry-content HTML to clean Markdown, best-effort downloads a cover
image, and writes content/blog/{slug}.mdx with frontmatter.

Not shipped as part of the app; run once during the rebuild.
"""
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
import urllib.parse
import html as html_lib
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "content", "blog")
IMAGES_DIR = os.path.join(ROOT, "public", "blog")
POST_LIST = os.path.join(ROOT, "scripts", "post_list.json")

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

SKIP_DIV_CLASSES = ("sharedaddy", "jp-relatedposts", "jp-post-flair", "wp-block-buttons",
                     "sd-sharing", "sd-block", "wpcnt")
SKIP_TAGS = ("script", "style", "iframe", "noscript", "form", "nav")

ESCAPE_CHARS = ["\\", "`", "*", "_", "{", "}", "[", "]", "<", ">"]


def escape_md(s: str) -> str:
    out = []
    for ch in s:
        if ch in ESCAPE_CHARS:
            out.append("\\" + ch)
        else:
            out.append(ch)
    return "".join(out)


class ContentConverter(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip_stack = []  # tag names currently being skipped
        self.list_stack = []  # 'ul' or 'ol'
        self.li_index_stack = []
        self.link_href = None
        self.link_text = []
        self.in_link = False
        self.in_blockquote = False
        self.blockquote_buf = []
        self.cover_image = None
        self.seen_any_text_since_block = True
        self.started = False
        self.finished = False
        self.content_depth = 0

    # -- helpers --
    def _emit(self, text):
        if self.in_blockquote:
            self.blockquote_buf.append(text)
        elif self.in_link:
            self.link_text.append(text)
        else:
            self.out.append(text)

    def _is_skipping(self):
        return len(self.skip_stack) > 0

    def _active_buf(self):
        if self.in_blockquote:
            return self.blockquote_buf
        if self.in_link:
            return self.link_text
        return self.out

    def _close_emphasis(self, marker):
        # move a closing marker before any trailing whitespace so it stays
        # adjacent to real content (CommonMark won't close emphasis
        # otherwise), e.g. "fair. ***" -> "fair.*** "
        buf = self._active_buf()
        while buf and buf[-1] == "":
            buf.pop()
        if buf:
            m = re.search(r"(\s+)$", buf[-1])
            if m:
                trailing = m.group(1)
                buf[-1] = buf[-1][: m.start()]
                buf.append(marker)
                buf.append(trailing)
                return
        buf.append(marker)

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)

        if not self.started:
            if tag == "div" and "entry-content" in (attrs_d.get("class") or ""):
                self.started = True
                self.content_depth = 1
            return
        if self.finished:
            return

        if tag == "div":
            self.content_depth += 1

        if self._is_skipping():
            if tag in SKIP_TAGS or (tag == "div" and any(c in (attrs_d.get("class") or "") for c in SKIP_DIV_CLASSES)):
                self.skip_stack.append(tag)
            return

        if tag in SKIP_TAGS:
            self.skip_stack.append(tag)
            return
        if tag == "div" and any(c in (attrs_d.get("class") or "") for c in SKIP_DIV_CLASSES):
            self.skip_stack.append(tag)
            return

        if tag == "img":
            src = attrs_d.get("src") or attrs_d.get("data-src")
            if src and not self.cover_image and "avatar" not in src.lower() and "emoji" not in src.lower():
                self.cover_image = src
            return
        if tag == "br":
            self._emit("  \n")
            return
        if tag in ("strong", "b"):
            self._emit("**")
            return
        if tag in ("em", "i"):
            self._emit("*")
            return
        if tag == "a":
            self.in_link = True
            self.link_href = attrs_d.get("href")
            self.link_text = []
            return
        if tag == "p":
            self._emit("\n\n")
            return
        if tag == "figcaption":
            self._emit("\n\n*")
            return
        if tag in ("h2", "h3", "h4"):
            self._emit("\n\n" + ("#" * (int(tag[1]) - 0)) + " ")
            return
        if tag in ("ul", "ol"):
            self.list_stack.append(tag)
            self.li_index_stack.append(0)
            self._emit("\n\n")
            return
        if tag == "li":
            if self.list_stack and self.list_stack[-1] == "ol":
                self.li_index_stack[-1] += 1
                self._emit(f"\n{self.li_index_stack[-1]}. ")
            else:
                self._emit("\n- ")
            return
        if tag == "blockquote":
            self.in_blockquote = True
            self.blockquote_buf = []
            return
        # unknown/transparent tag: do nothing, children still processed

    def handle_endtag(self, tag):
        if not self.started or self.finished:
            return

        if tag == "div":
            self.content_depth -= 1
            if self.content_depth <= 0:
                self.finished = True
                return

        if self.skip_stack and self.skip_stack[-1] == tag:
            self.skip_stack.pop()
            return
        if self._is_skipping():
            return

        if tag in ("strong", "b"):
            self._close_emphasis("**")
            return
        if tag in ("em", "i"):
            self._close_emphasis("*")
            return
        if tag == "figcaption":
            self._emit("*\n\n")
            return
        if tag == "a":
            self.in_link = False
            text = "".join(self.link_text).strip()
            href = self.link_href or ""
            if text and href and href.startswith("http"):
                self._emit(f"[{text}]({href})")
            elif text:
                self._emit(text)
            return
        if tag in ("ul", "ol"):
            if self.list_stack:
                self.list_stack.pop()
                self.li_index_stack.pop()
            self._emit("\n\n")
            return
        if tag == "blockquote":
            self.in_blockquote = False
            text = "".join(self.blockquote_buf).strip()
            quoted = "\n".join("> " + line if line.strip() else ">" for line in text.split("\n"))
            self.out.append("\n\n" + quoted + "\n\n")
            return

    def handle_data(self, data):
        if not self.started or self.finished:
            return
        if self._is_skipping():
            return
        text = data.replace("\xa0", " ")
        if not text.strip():
            if text:
                self._emit(" ")
            return
        self._emit(escape_md(text))

    def get_markdown(self):
        raw = "".join(self.out)
        # collapse 3+ newlines to 2, collapse runs of spaces
        raw = re.sub(r"[ \t]+", " ", raw)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        raw = re.sub(r"[ \t]+\n", "\n", raw)
        return raw.strip()


def fetch(url, timeout=25, retries=5):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    last_err = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except urllib.error.HTTPError as e:
            last_err = e
            if e.code in (503, 429):
                time.sleep(8 * (attempt + 1))
                continue
            raise
        except Exception as e:
            last_err = e
            time.sleep(5 * (attempt + 1))
    raise last_err


def year_hint_from_url(image_url):
    # misinsured.net uploads are stored at /wp-content/uploads/YYYY/MM/...
    m = re.search(r"/uploads/(\d{4})/(\d{2})/", image_url)
    if m:
        return m.group(1) + m.group(2) + "01"
    return "2020"


def slugify_title_fallback(slug):
    return slug.replace("-", " ").title()


def process_post(slug, ts, force=False):
    out_path = os.path.join(CONTENT_DIR, f"{slug}.mdx")
    if os.path.exists(out_path) and not force:
        return "skip"

    url = f"https://web.archive.org/web/{ts}id_/https://misinsured.net/{slug}/"
    try:
        html_bytes = fetch(url)
    except Exception as e:
        print(f"  FETCH FAIL {slug}: {e}")
        return "fail"

    html = html_bytes.decode("utf-8", "ignore")

    main_m = re.search(r'<main[^>]*>(.*?)</main>', html, re.S | re.I)
    scope_html = main_m.group(1) if main_m else html

    # title/date live in a page-header block that sits *outside* <main> in
    # this theme's single-post template, so search the whole document.
    title_m = re.search(r'<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)</h1>', html, re.S | re.I)
    title = html_lib.unescape(re.sub(r"<[^>]+>", "", title_m.group(1))).strip() if title_m else slugify_title_fallback(slug)

    date_m = re.search(r'<time[^>]*datetime="([^"]+)"', html, re.I)
    date_iso = date_m.group(1)[:10] if date_m else "2018-01-01"

    # strip HTML comments
    clean_html = re.sub(r"<!--.*?-->", "", scope_html, flags=re.S)

    conv = ContentConverter()
    conv.feed(clean_html)
    md = conv.get_markdown()

    if len(md) < 40:
        print(f"  THIN CONTENT {slug} ({len(md)} chars)")

    excerpt = re.sub(r"[#>*\\\-\n]+", " ", md)
    excerpt = re.sub(r"\s+", " ", excerpt).strip()[:180]

    image_field = ""
    if conv.cover_image:
        img_url = conv.cover_image
        if img_url.startswith("//"):
            img_url = "https:" + img_url
        ext = os.path.splitext(urllib.parse.urlparse(img_url).path)[1].split("?")[0] or ".jpg"
        if ext.lower() not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
            ext = ".jpg"
        local_name = f"{slug}{ext}"
        local_path = os.path.join(IMAGES_DIR, local_name)
        if not os.path.exists(local_path):
            year_hint = year_hint_from_url(img_url)
            fetch_url = f"https://web.archive.org/web/{year_hint}im_/{img_url}"
            try:
                img_bytes = fetch(fetch_url, timeout=12, retries=1)
                if len(img_bytes) > 300:
                    with open(local_path, "wb") as f:
                        f.write(img_bytes)
                    image_field = f"/blog/{local_name}"
            except Exception:
                pass
        else:
            image_field = f"/blog/{local_name}"

    fm_title = title.replace('"', '\\"')
    fm_excerpt = excerpt.replace('"', '\\"')
    frontmatter = [
        "---",
        f'title: "{fm_title}"',
        f'date: "{date_iso}"',
        f'excerpt: "{fm_excerpt}"',
    ]
    if image_field:
        frontmatter.append(f'image: "{image_field}"')
    frontmatter.append("---")

    mdx = "\n".join(frontmatter) + "\n\n" + md + "\n"
    os.makedirs(CONTENT_DIR, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(mdx)
    return "ok"


def main():
    os.makedirs(CONTENT_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)
    with open(POST_LIST, encoding="utf-8") as f:
        posts = json.load(f)

    force = "--force" in sys.argv
    only = None
    for a in sys.argv[1:]:
        if a.startswith("--only="):
            only = set(a.split("=", 1)[1].split(","))

    stats = {"ok": 0, "skip": 0, "fail": 0}
    for i, p in enumerate(posts):
        slug, ts = p["slug"], p["ts"]
        if only and slug not in only:
            continue
        result = process_post(slug, ts, force=force)
        stats[result] += 1
        print(f"[{i+1}/{len(posts)}] {result.upper():5s} {slug}")
        sys.stdout.flush()
        time.sleep(2.0)

    print(stats)


if __name__ == "__main__":
    main()
