import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "MisInsured helps you find the right insurance attorney or public adjuster, free of charge.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="pagehead">
        <div className="pagehead-in">
          <div className="eyebrow">Who We Are</div>
          <h1>About MisInsured</h1>
          <p className="lede">
            MisInsured is your starting point when you have a question or problem with your insurance.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="auth-grid">
          <div className="auth-photo brand-photo light">
            <Image src="/images/kd-headshot.jpg" alt="Kathleen M. DeFever" width={683} height={1024} />
          </div>
          <div className="auth-copy">
            <p>
              The insurance landscape is vast and confusing, and an insurance policy is a unique product written in
              specialized insurance terminology. Insurance transactions (claims, insurance sales) and policies are
              regulated by specific, tailored insurance laws and regulations. When you need advice on an insurance issue,
              you need specialized advice from a licensed insurance law or claims expert. MisInsured was created to help
              you locate that expert, free of charge.
            </p>
            <div className="eyebrow" style={{ marginTop: 36 }}>
              About Our Founder
            </div>
            <h2 style={{ margin: "0 0 16px" }}>Kathleen M. DeFever</h2>
            <p>
              Kathleen M. DeFever is an insurance attorney, public insurance adjuster, and insurance law expert with more
              than 15 years of experience advising insurance consumers. She is one of the few professionals in the United
              States who has worked as both an insurance adjuster and an insurance litigator, and is personally dedicated
              to the improvement of the consumer&apos;s experience with insurance. She has a Master&apos;s of Insurance Law
              (LLM) from the University of Connecticut School of Law, and is working on her Insurance Law Doctorate at
              Ghent University.
            </p>
            <div className="stat-row">
              <div className="stat">
                <b>15+</b>
                <span>Years Advising Consumers</span>
              </div>
              <div className="stat">
                <b>2</b>
                <span>Licenses: Attorney &amp; Adjuster</span>
              </div>
              <div className="stat">
                <b>$0</b>
                <span>Cost To Get Matched</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-sec" style={{ paddingTop: 0 }}>
        <div className="ctabox" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div>
            <h3>Not sure where to start?</h3>
            <p>Tell us about your situation and we&apos;ll point you to the right expert, free of charge.</p>
          </div>
          <Link href="/contact" className="btn on-dark">
            Contact Us &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
