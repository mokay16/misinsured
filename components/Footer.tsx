import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <Link className="logo" href="/">
          <Image src="/images/logo.jpg" alt="MisInsured" height={24} width={100} style={{ height: 24, width: "auto" }} />
        </Link>
        <div className="foot-links">
          <span>&copy; {new Date().getFullYear()} MisInsured</span>
          <Link href="/contact">Contact</Link>
          <Link href="/media-inquiries">Media Inquiries</Link>
          <a href="https://www.defeverlaw.com/" target="_blank" rel="noopener noreferrer">
            DeFever Law
          </a>
          <a href="https://www.youtube.com/@MisInsured" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
