import Link from "next/link";
import PIcon from "@/components/PIcon";
import PostCard from "@/components/PostCard";
import ChatWidget from "@/components/ChatWidget";
import FounderTrio from "@/components/FounderTrio";
import HeroVideo from "@/components/HeroVideo";

const FEATURED_POSTS = [
  {
    slug: "even-beyonce-feels-your-insurance-woes",
    date: "April 1, 2024",
    title: "Even Beyonce Feels Your Insurance Woes",
  },
  {
    slug: "radio-appearance-insurance-companies-withhold-policies-for-california-homeowners-due-to-wildfire-risks",
    date: "September 2, 2022",
    title: "Radio Appearance on KCBS: Insurers Withhold Policies for CA Homeowners Due to Wildfire Risk",
  },
  {
    slug: "certified-in-colorado",
    date: "February 16, 2022",
    title: "Certified Public Insurance Adjuster in Colorado",
  },
  {
    slug: "fire-victims-hire-a-public-adjuster",
    date: "October 5, 2020",
    title: "NBC Bay Area News to Fire Victims: Hire a Public Adjuster",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Free &middot; Independent</div>
            <h1>Your first step toward compensation for insurance claims.</h1>
            <p className="lede">
              MisInsured was created to help you locate the licensed insurance law or claims expert you need &mdash; free of charge.
            </p>
            <div className="hero-ctas">
              <Link href="/consumer-insurance-attorney" className="btn solid">
                I Need a Consumer Insurance Attorney
              </Link>
              <Link href="/do-i-need-a-public-insurance-adjuster-or-an-attorney" className="btn ghost">
                I&apos;m Not Sure Who I Need
              </Link>
            </div>
            <div className="reassure">Free of charge. No obligation. Just a clear next step.</div>
          </div>
          <HeroVideo />
        </div>
      </section>

      <section className="triage">
        <div className="triage-head">
          <p>Choose the option that matches your situation</p>
        </div>
        <div className="pillrow-grid">
          <Link href="/consumer-insurance-attorney" className="pillcard">
            <span className="pill-badge">Litigation Track</span>
            <PIcon name="attorney" />
            <h4>Consumer Insurance Attorney</h4>
            <p>For claims that need litigation, illegal denials, or bad faith disputes.</p>
          </Link>
          <Link href="/do-i-need-a-public-insurance-adjuster-or-an-attorney" className="pillcard featured">
            <span className="pill-badge">Not Sure Yet</span>
            <PIcon name="unsure" />
            <h4>I&apos;m Not Sure Who I Need</h4>
            <p>Answer a few quick questions and we&apos;ll point you in the right direction.</p>
          </Link>
          <Link href="/public-adjuster" className="pillcard">
            <span className="pill-badge">Valuation Track</span>
            <PIcon name="adjuster" />
            <h4>Public Insurance Adjuster</h4>
            <p>For property or business interruption claims that need a skilled valuation.</p>
          </Link>
        </div>
      </section>

      <section className="compare">
        <div className="compare-grid">
          <div className="cpanel">
            <PIcon name="attorney" />
            <h4>Consumer Insurance Attorney</h4>
            <div className="who">Works On Litigation</div>
            <ul>
              <li>Trained in insurance law and litigation</li>
              <li>Steps in once a lawsuit needs to be filed</li>
              <li>Handles disputes beyond property claims &mdash; any type of insurance issue</li>
              <li>Advocates for you against the insurance company</li>
            </ul>
          </div>
          <div className="cvs">or</div>
          <div className="cpanel">
            <PIcon name="adjuster" />
            <h4>Public Insurance Adjuster</h4>
            <div className="who">Works Only For You</div>
            <ul>
              <li>Specially trained in property insurance claims</li>
              <li>Analyzes and documents your damages</li>
              <li>Prepares claim forms and negotiates your settlement</li>
              <li>Never works for the insurance company &mdash; only the policyholder</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec on-tan">
        <div className="how-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            How MisInsured Works
          </div>
          <h2>Free of charge, from first question to right expert.</h2>
          <p>
            The insurance landscape is vast and confusing, written in specialized terminology and governed by its own laws.
            MisInsured exists to connect you with the licensed expert who can actually help.
          </p>
        </div>
        <div className="flow">
          <div className="fnode">
            <div className="circle">1</div>
            <h4>Tell us your situation</h4>
            <p>Choose the option above that matches where you are with your claim.</p>
          </div>
          <div className="farrow">&rarr;</div>
          <div className="fnode">
            <div className="circle">2</div>
            <h4>Get pointed to the right expert</h4>
            <p>An attorney, a public adjuster, or clarity on which one you actually need.</p>
          </div>
          <div className="farrow">&rarr;</div>
          <div className="fnode">
            <div className="circle">3</div>
            <h4>Move forward, free of charge</h4>
            <p>MisInsured doesn&apos;t charge you to make the connection.</p>
          </div>
        </div>
      </section>

      <FounderTrio />

      <section className="chatsec on-tan">
        <div className="chat-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Talk It Through
          </div>
          <h2>Not sure where to start? Ask.</h2>
          <p>The same three questions we&apos;d ask you on the phone &mdash; answer them here first.</p>
        </div>
        <ChatWidget />
      </section>

      <section className="press">
        <div className="wrap">
          <div className="label">As Seen &amp; Heard On</div>
          <div className="outlets">
            <span>NBC Bay Area</span>
            <span>KCBS Radio</span>
            <span>KALW 97.1 SF</span>
            <span>AIDA Europe</span>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="blog-top">
          <h2>Latest From MisInsured</h2>
          <Link href="/blog">Read the full blog &rarr;</Link>
        </div>
        <div className="blog-grid">
          {FEATURED_POSTS.map((p) => (
            <PostCard key={p.slug} href={`/blog/${p.slug}`} date={p.date} title={p.title} />
          ))}
        </div>
      </section>

      <section className="crosslink sec on-dark">
        <div className="wrap">
          <div>
            <div className="eyebrow" style={{ color: "var(--rose)" }}>
              Related
            </div>
            <h3>DeFever Law</h3>
          </div>
          <a href="https://www.defeverlaw.com/" className="btn on-dark" target="_blank" rel="noopener noreferrer">
            Visit DeFever Law &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
