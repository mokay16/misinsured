import type { Metadata } from "next";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Media Inquiries",
  description: "Contact information for media inquiries regarding MisInsured and Kathleen M. DeFever.",
};

export default function MediaInquiriesPage() {
  return (
    <main>
      <PageHead eyebrow="Press" title="Media Inquiries" />
      <section className="content-sec">
        <div className="content-body">
          <p>For media inquiries, please contact:</p>
          <div className="qbox">
            <b>Brittney Haning</b>
            <p style={{ margin: "0 0 4px" }}>Made to Measure Communications</p>
            <p style={{ margin: 0 }}>
              <a href="mailto:Info@M2MComms.com" style={{ color: "var(--maroon)", fontWeight: 600 }}>
                Info@M2MComms.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
