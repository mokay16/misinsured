import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Media",
  description: "Press, radio, and conference appearances featuring MisInsured founder Kathleen M. DeFever.",
};

const ITEMS = [
  {
    kicker: "Radio Appearance: KALW.org",
    title: "Insurance Coverage And Wildfires",
    date: "January 15, 2025",
    href: "https://www.kalw.org/show/your-legal-rights/2025-01-15/insurance-coverage-and-wildfires",
    external: true,
    body: "Your insurer has declined to renew a policy, not due to what you've done but because of where we are or the type of policy. Your broker says you have to use a non-California licensed carrier. Are they beyond California law? What happens if you make a claim?",
    linkLabel: "Listen here →",
  },
  {
    kicker: "Radio Appearance: KCBS",
    title: "Fire Victims",
    date: "January 13, 2025",
    href: "/blog/radio-appearance-insurance-companies-withhold-policies-for-california-homeowners-due-to-wildfire-risks",
    external: false,
    body: "Radio Appearance on KCBS: Insurance Companies Withhold Policies for California Homeowners Due to Wildfire Risks.",
    linkLabel: "Read more →",
  },
  {
    kicker: "Radio Appearance: KALW 97.1",
    title: "Insurance Coverage, Covid, and Other Disasters",
    date: null,
    href: "/blog/insurance-coverage-covid-and-other-disasters-kalw-97-1-radio-san-francisco-podcast",
    external: false,
    body: "A KALW 97.1 Radio San Francisco podcast appearance on insurance coverage during Covid and other disasters.",
    linkLabel: "Read more →",
  },
  {
    kicker: "Conference Appearance",
    title: "Transparency in Insurance Contract Law, May 19",
    date: null,
    href: "/blog/transparency-in-insurance-contract-law-may-19",
    external: false,
    body: "A conference appearance on transparency in insurance contract law.",
    linkLabel: "Read more →",
  },
  {
    kicker: "Radio Appearance: KALW 97.1",
    title: "Insurance Coverage and Your Rights",
    date: null,
    href: "/blog/insurance-coverage-and-your-rights-kalw-97-1-radio-san-francisco-podcast",
    external: false,
    body: "A KALW 97.1 Radio San Francisco podcast appearance on insurance coverage and your rights.",
    linkLabel: "Read more →",
  },
  {
    kicker: "Publication",
    title: "My Publication on the EU's Insurance Distribution Directive",
    date: null,
    href: "/blog/my-publication-on-the-eus-insurance-distribution-directive",
    external: false,
    body: "Kathleen M. DeFever's published work on the EU's Insurance Distribution Directive.",
    linkLabel: "Read more →",
  },
];

export default function MediaPage() {
  return (
    <main>
      <PageHead
        eyebrow="Press &amp; Appearances"
        title="Media"
        lede="Radio, conference, and publication appearances from MisInsured founder Kathleen M. DeFever."
      />
      <section className="content-sec">
        <div className="content-body" style={{ maxWidth: 820 }}>
          {ITEMS.map((item, i) => (
            <div className="qbox" key={i}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                {item.kicker}
              </div>
              <b>{item.title}</b>
              {item.date ? <div className="article-meta" style={{ margin: "4px 0 12px" }}>{item.date}</div> : <div style={{ height: 8 }} />}
              <p style={{ margin: "0 0 10px" }}>{item.body}</p>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn ghost">
                  {item.linkLabel}
                </a>
              ) : (
                <Link href={item.href} className="btn ghost">
                  {item.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
