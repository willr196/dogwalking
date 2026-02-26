import type { Metadata } from "next";
import { PageLayout } from "@/components/willswalks/PageLayout";
import { ContactClient } from "@/app/contact/ContactClient";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.brandName}`,
  description: `Get in touch with ${siteConfig.brandName} about dog walking in Fulham and SW6.`,
  alternates: { canonical: `${siteConfig.siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactClient />
    </PageLayout>
  );
}
