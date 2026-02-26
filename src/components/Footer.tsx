import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Footer() {
  const whatsappHref = siteConfig.owner.whatsapp ? `https://wa.me/${siteConfig.owner.whatsapp}` : null;
  const hours = `${siteConfig.businessHours.opens} - ${siteConfig.businessHours.closes}`;

  return (
    <footer className="border-t border-slate-200 py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div>
            <h2 className="text-xl text-slate-900">Will&apos;s Walks</h2>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Calm solo and small-group dog walks in Fulham and SW6.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h3>
            <p className="mt-3 text-sm text-slate-700">
              <Link href={`mailto:${siteConfig.owner.email}`} className="hover:text-slate-900">
                {siteConfig.owner.email}
              </Link>
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {whatsappHref ? (
                <Link href={whatsappHref} className="hover:text-slate-900">
                  WhatsApp chat
                </Link>
              ) : (
                "WhatsApp available after meet & greet"
              )}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Hours</h3>
            <p className="mt-3 text-sm text-slate-700">
              {dayLabels.join(" / ")}
              <br />
              {hours}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
