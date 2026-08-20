import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PostCard from "@/components/PostCard";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insurance news, consumer rights, and commentary from MisInsured.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main>
      <PageHead
        eyebrow="Insurance Blog"
        title="The MisInsured Blog"
        lede="News, commentary, and consumer-rights coverage of the insurance industry."
      />
      <section className="blog-listing">
        <div className="blog-grid">
          {posts.map((p) => (
            <PostCard key={p.slug} href={`/blog/${p.slug}`} image={p.image} date={formatDate(p.date)} title={p.title} />
          ))}
        </div>
        {posts.length === 0 ? <p style={{ textAlign: "center", color: "var(--slate)" }}>No posts yet.</p> : null}
      </section>
    </main>
  );
}
