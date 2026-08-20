import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Do I Need a Public Insurance Adjuster or an Attorney?",
  description: "Not sure who you need? Answer three quick questions to find out — free of charge.",
};

const QUESTIONS = [
  {
    q: "What kind of insurance problem do I have?",
    a: "If your problem or question is about a property insurance claim, you may need a Public Adjuster. Problems with all other types of insurance are likely to need the advice of a Consumer Insurance Attorney.",
  },
  {
    q: "Is my question about the purchase of insurance coverage?",
    a: "You likely need the advice of an insurance agent or broker.",
  },
  {
    q: "Do I have a problem with my insurance claim or my insurance broker/agent that I can't seem to resolve?",
    a: "You likely need the advice of a Consumer Insurance Attorney.",
  },
];

export default function DoINeedPage() {
  return (
    <main>
      <PageHead
        eyebrow="Not Sure Yet"
        title="Do I need a Public Insurance Adjuster or an Attorney?"
        lede="When you contact MisInsured, we will help you determine what kind of assistance you need, free of charge."
      />
      <section className="content-sec">
        <div className="content-body">
          <p>
            You can contact us through the online form, or call{" "}
            <a href="tel:+18446471415" style={{ color: "var(--maroon)", fontWeight: 600 }}>
              844-647-1415
            </a>{" "}
            / 844-MIS-1415.
          </p>
          <h2>Here are some questions to ask yourself:</h2>
          {QUESTIONS.map((item) => (
            <div className="qbox" key={item.q}>
              <b>{item.q}</b>
              <p style={{ margin: 0 }}>{item.a}</p>
            </div>
          ))}

          <div className="ctabox">
            <div>
              <h3>Still not sure?</h3>
              <p>Talk it through with our free guide on the homepage, or reach out directly.</p>
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
