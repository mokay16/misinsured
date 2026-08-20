import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PIcon from "@/components/PIcon";

export const metadata: Metadata = {
  title: "Public Insurance Adjuster",
  description:
    "Learn when you need a public insurance adjuster, what services they perform, and how MisInsured connects you with one, free of charge.",
};

export default function PublicAdjusterPage() {
  return (
    <main>
      <PageHead
        eyebrow="Valuation Track"
        title="Public Insurance Adjuster"
        lede="Works only for you — specially trained to analyze, document, and negotiate your property insurance claim."
      />
      <section className="content-sec">
        <div className="content-body">
          <div className="icon-badge">
            <PIcon name="adjuster" />
            <span className="itxt">03 &middot; Valuation Track</span>
          </div>
          <p>
            You probably need a Public Adjuster when you are filing a property insurance or business interruption
            claim. For example, when your home or business is damaged or destroyed by an event covered by your
            Homeowners or Business insurance policy, or your normal course of business is interrupted by a covered
            event.
          </p>
          <p>
            Public Adjusters are adjusters who work only for the policyholder. Do not confuse them with Independent
            Adjusters, who are hired as independent contractors by insurance companies, and Claims Adjusters, who
            work only for insurance companies.
          </p>
          <p>
            Public Adjusters make a skilled analysis of your damages, prepare all the insurance claim forms on your
            behalf, and negotiate all payments and settlements with your insurance company. Their work is incredibly
            detailed and specialized, and performed over a long period of time. Therefore, it is very important to
            hire only an experienced and reputable Public Adjuster.
          </p>
          <h2>Services Public Adjusters perform include:</h2>
          <ul className="dotlist">
            <li>Estimation and submission of Rebuilding Costs with the assistance of building and construction experts</li>
            <li>Selection of appropriate emergency damage remediation and property protection services</li>
            <li>Preparation of an Additional Living Expense (ALE) / Loss of Use claim</li>
            <li>Estimation of Business Income Loss and Additional Expenses documentation</li>
            <li>Inventory of your lost or damaged Personal or Business Property (Contents Inventory)</li>
            <li>Maximization of your insurance policy benefits through in-depth knowledge of all policies and their varying coverages</li>
          </ul>
          <p>
            An excellent Public Adjuster will offer an entire team of experts to handle every aspect of your loss,
            including building estimators, contents inventory specialists, and accountants. Public Adjusters are
            experiencing an upsurge in demand due to both the recent increase in natural disasters, and the
            incredible benefits they offer at an excellent value.
          </p>

          <div className="ctabox">
            <div>
              <h3>Get a free analysis of your issue</h3>
              <p>
                We can provide you with the contact information of a reputable Public Adjuster, Attorney, or other
                source of assistance. Or call 844-647-1415 / 844-MIS-1415.
              </p>
            </div>
            <Link href="/contact" className="btn on-dark">
              Contact Us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
