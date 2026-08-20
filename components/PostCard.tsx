import Link from "next/link";

export default function PostCard({
  href,
  image,
  date,
  title,
  external = false,
}: {
  href: string;
  image?: string;
  date: string;
  title: string;
  external?: boolean;
}) {
  const inner = (
    <>
      {image ? (
        <div className="brand-photo light" style={{ aspectRatio: "1/1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" />
        </div>
      ) : (
        <div className="brand-photo noimg" style={{ aspectRatio: "1/1" }}>
          <span className="noimg-mark">MI</span>
        </div>
      )}
      <div className="post-body">
        <div className="post-date">{date}</div>
        <div className="post-title">{title}</div>
      </div>
    </>
  );

  if (external) {
    return (
      <a className="post-card" href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link className="post-card" href={href}>
      {inner}
    </Link>
  );
}
