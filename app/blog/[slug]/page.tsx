import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <section className="article-head">
        <div className="article-head-in">
          <div className="breadcrumb">
            <Link href="/blog">Blog</Link> / {post.title}
          </div>
          <h1>{post.title}</h1>
          <div className="article-meta">{formatDate(post.date)}</div>
        </div>
      </section>

      {post.image ? (
        <div className="article-cover" style={{ marginTop: 40 }}>
          <div className="brand-photo light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} />
          </div>
        </div>
      ) : null}

      <article className="article-body">
        <MDXRemote source={post.content} />
      </article>

      <div className="article-foot">
        <div className="ctabox">
          <div>
            <h3>Need help with an insurance issue?</h3>
            <p>MisInsured connects you with the right licensed expert, free of charge.</p>
          </div>
          <Link href="/contact" className="btn on-dark">
            Contact Us &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
