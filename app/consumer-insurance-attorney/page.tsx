import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import PIcon from "@/components/PIcon";

export const metadata: Metadata = {
  title: "Consumer Insurance Attorney",
  description:
    "Learn when you need a consumer insurance attorney, what they handle, and how MisInsured connects you with one, free of charge.",
};

export default function ConsumerInsuranceAttorneyPage() {
  return (
    <main>
      <PageHead
        eyebrow="Litigation Track"
        title="Consumer Insurance Attorney"
        lede="Trained in insurance law and litigation — the right fit once a claim has become an unsolvable conflict."
      />
      <section className="content-sec">
        <div className="content-body">
          <div className="icon-badge">
            <PIcon name="attorney" />
            <span className="itxt">01 &middot; Litigation Track</span>
          </div>
          <p>
            You typically need an insurance attorney when you have encountered an unsolvable conflict with your
            insurance claim. Insurance attorneys can also be hired to manage insurance claims. However, if your
            insurance claim is for damaged or destroyed property, hiring an attorney is not advisable because (1)
            attorneys are much more expensive than public adjusters, and (2) they are not as expert at managing a
            property insurance claim as a licensed Public Adjuster is. Public Adjusters undergo special training on
            all aspects of a property insurance claim. Consumer Insurance Attorneys are trained in insurance laws and
            navigating the litigation which is needed after a lawsuit is filed.
          </p>
          <h2>Consumer Insurance Attorneys handle issues like:</h2>
          <ul className="dotlist">
            <li>Insurance claim management (but typically not property or business interruption claims)</li>
            <li>Illegal claim denials</li>
            <li>Bad faith claim handling</li>
            <li>Disputes over insurance policy interpretation</li>
            <li>Insurance agent/broker negligence</li>
            <li>Violations of the insurance code of your state</li>
            <li>Negotiations of claim settlements</li>
            <li>Filing lawsuits over insurance claim or coverage disputes</li>
          </ul>

          <div className="ctabox">
            <div>
              <h3>Get a free analysis of your issue</h3>
              <p>
                We can provide you with the contact information of a reputable Attorney, Public Adjuster, or other
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
