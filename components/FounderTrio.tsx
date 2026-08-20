import Image from "next/image";
import Link from "next/link";
import PIcon, { IconName } from "./PIcon";

const REASONS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "check",
    title: "15+ Years Experience",
    body: "Advising insurance consumers on claims, denials, and disputes.",
  },
  {
    icon: "attorney",
    title: "Attorney & Adjuster",
    body: "One of the few professionals licensed as both — so you get pointed to the right one.",
  },
  {
    icon: "unsure",
    title: "Free, No Obligation",
    body: "There's no cost to you to get matched with the right licensed expert.",
  },
];

export default function FounderTrio() {
  return (
    <section className="trio">
      <div className="trio-grid">
        <div className="trio-photo brand-photo light">
          <Image
            src="/images/kd-headshot.jpg"
            alt="Kathleen M. DeFever"
            fill
            sizes="(max-width: 980px) 100vw, 300px"
            style={{ objectFit: "cover" }}
          />
          <div className="playbtn" />
        </div>

        <div className="trio-dark">
          <div className="eyebrow">About Our Founder</div>
          <h2>Kathleen M. DeFever</h2>
          <p>
            An insurance attorney, public insurance adjuster, and insurance law expert with more than 15 years of
            experience advising insurance consumers &mdash; personally dedicated to improving the consumer&apos;s
            experience with insurance.
          </p>
          <Link href="/about" className="btn on-dark" style={{ alignSelf: "flex-start" }}>
            More About MisInsured &rarr;
          </Link>
        </div>

        <div className="trio-white">
          <h3>Why Choose MisInsured</h3>
          {REASONS.map((r) => (
            <div className="trio-item" key={r.title}>
              <PIcon name={r.icon} />
              <div>
                <b>{r.title}</b>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
