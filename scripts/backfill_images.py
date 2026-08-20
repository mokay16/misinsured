"""
One-off follow-up script: the first extraction pass only landed a cover
image for 1 of 92 posts (Wayback was rate-limiting the CDX + image
lookups). This re-fetches each post's page (to re-discover its first
content image URL, which wasn't persisted anywhere), looks up the
image's own exact Wayback snapshot via CDX, downloads it, and patches
the existing MDX frontmatter with an `image:` field.

Not shipped as part of the app; run once as a follow-up to extract_blog.py.
"""
import json
import os
import re
import sys
import time
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract_blog import (  # noqa: E402
    ROOT, CONTENT_DIR, IMAGES_DIR, POST_LIST, fetch, ContentConverter, year_hint_from_url,
)


def cdx_lookup(image_url, timeout=20, retries=3):
    api = f"https://web.archive.org/cdx/search/cdx?url={urllib.parse.quote(image_url, safe='')}&output=json&limit=1&filter=statuscode:200"
    try:
        data = fetch(api, timeout=timeout, retries=retries)
        rows = json.loads(data.decode("utf-8", "ignore"))
        if len(rows) > 1:
            return rows[1][1]
    except Exception as e:
        print(f"    cdx lookup failed: {e}")
    return None


def find_cover_image(slug, ts):
    url = f"https://web.archive.org/web/{ts}id_/https://misinsured.net/{slug}/"
    html_bytes = fetch(url, timeout=25, retries=4)
    html = html_bytes.decode("utf-8", "ignore")
    main_m = re.search(r"<main[^>]*>(.*?)</main>", html, re.S | re.I)
    scope_html = main_m.group(1) if main_m else html
    clean_html = re.sub(r"<!--.*?-->", "", scope_html, flags=re.S)
    conv = ContentConverter()
    conv.feed(clean_html)
    return conv.cover_image


def download_image(img_url, local_path):
    if img_url.startswith("//"):
        img_url = "https:" + img_url

    # Always go through Wayback rather than fetching the origin directly —
    # some old wordpress.com-hosted URLs have long-expired TLS certs, and
    # Wayback handles that for us regardless of which host originally served it.
    ts = cdx_lookup(img_url)

    urls_to_try = []
    if ts:
        urls_to_try.append(f"https://web.archive.org/web/{ts}im_/{img_url}")
    else:
        urls_to_try.append(f"https://web.archive.org/web/{year_hint_from_url(img_url)}im_/{img_url}")

    for u in urls_to_try:
        try:
            data = fetch(u, timeout=15, retries=2)
            if len(data) > 300:
                with open(local_path, "wb") as f:
                    f.write(data)
                return True
        except Exception:
            continue
    return False


def patch_frontmatter(mdx_path, image_field):
    with open(mdx_path, encoding="utf-8") as f:
        content = f.read()
    if re.search(r'^image:\s*"', content, re.M):
        return  # already has one
    content = re.sub(r'(^excerpt:.*$)', r'\1\n' + f'image: "{image_field}"', content, count=1, flags=re.M)
    with open(mdx_path, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    with open(POST_LIST, encoding="utf-8") as f:
        posts = json.load(f)

    only = None
    for a in sys.argv[1:]:
        if a.startswith("--only="):
            only = set(a.split("=", 1)[1].split(","))

    stats = {"ok": 0, "skip": 0, "no_image": 0, "fail": 0}
    for i, p in enumerate(posts):
        slug, ts = p["slug"], p["ts"]
        if only and slug not in only:
            continue

        mdx_path = os.path.join(CONTENT_DIR, f"{slug}.mdx")
        if not os.path.exists(mdx_path):
            print(f"[{i+1}/{len(posts)}] MISSING-MDX {slug}")
            continue

        with open(mdx_path, encoding="utf-8") as f:
            existing = f.read()
        if re.search(r'^image:\s*"', existing, re.M):
            stats["skip"] += 1
            print(f"[{i+1}/{len(posts)}] SKIP  {slug} (already has image)")
            sys.stdout.flush()
            continue

        try:
            cover = find_cover_image(slug, ts)
        except Exception as e:
            print(f"[{i+1}/{len(posts)}] FAIL  {slug} (page fetch: {e})")
            stats["fail"] += 1
            sys.stdout.flush()
            time.sleep(1.5)
            continue

        if not cover:
            stats["no_image"] += 1
            print(f"[{i+1}/{len(posts)}] NO-IMG {slug}")
            sys.stdout.flush()
            time.sleep(1.0)
            continue

        ext = os.path.splitext(urllib.parse.urlparse(cover).path)[1].split("?")[0] or ".jpg"
        if ext.lower() not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
            ext = ".jpg"
        local_name = f"{slug}{ext}"
        local_path = os.path.join(IMAGES_DIR, local_name)

        ok = download_image(cover, local_path)
        if ok:
            patch_frontmatter(mdx_path, f"/blog/{local_name}")
            stats["ok"] += 1
            print(f"[{i+1}/{len(posts)}] OK    {slug} -> {local_name}")
        else:
            stats["fail"] += 1
            print(f"[{i+1}/{len(posts)}] FAIL  {slug} (download: {cover})")
        sys.stdout.flush()
        time.sleep(1.5)

    print(stats)


if __name__ == "__main__":
    main()
