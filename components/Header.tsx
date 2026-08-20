"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/media", label: "Media" },
  { href: "/media-inquiries", label: "Media Inquiries" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <>
      <div className="ribbon">Your First Step Toward Compensation For Insurance Claims.</div>
      <header>
        <div className="nav">
          <Link className="logo" href="/">
            <Image src="/images/logo.jpg" alt="MisInsured" height={34} width={140} style={{ height: 34, width: "auto" }} priority />
          </Link>
          <nav className="navlinks">
            {NAV_LINKS.map((l) => {
              const isCurrent = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href} className={isCurrent ? "current" : ""}>
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="navutil">
            <a className="yticon" href="https://www.youtube.com/@MisInsured" title="Visit us on YouTube" target="_blank" rel="noopener noreferrer">
              &#9654;
            </a>
            <Link href="/contact" className="btn solid">
              Contact
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
