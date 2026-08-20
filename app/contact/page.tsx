import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MisInsured for a free analysis of your insurance issue.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHead
        eyebrow="Get In Touch"
        title="Contact"
        lede="Free of charge, no obligation. Tell us what's going on and we'll point you to the right expert."
      />
      <section className="content-sec">
        <div className="contact-grid">
          <ContactForm />
          <div className="info-card">
            <h3>MisInsured, LLC</h3>
            <div className="info-row">
              <span className="k">Address</span>
              <span className="v">
                1550G Tiburon Blvd.
                <br />
                Suite 500
                <br />
                Tiburon, CA 94920
              </span>
            </div>
            <div className="info-row">
              <span className="k">Phone</span>
              <span className="v">
                <a href="tel:+18446471415">(844) 647-1415</a>
              </span>
            </div>
            <div className="info-row">
              <span className="k">Fax</span>
              <span className="v">(415) 366-1415</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
