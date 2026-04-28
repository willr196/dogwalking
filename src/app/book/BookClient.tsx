"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Icons } from "@/components/willswalks/Icons";

type BookingForm = {
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  notes: string;
  preferredDays: string;
  preferredTimes: string;
};

const initialForm: BookingForm = {
  ownerName: "",
  email: "",
  phone: "",
  dogName: "",
  dogBreed: "",
  dogAge: "",
  notes: "",
  preferredDays: "",
  preferredTimes: "",
};

export function BookClient() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const calendlyUrl = useMemo(() => siteConfig.calendlyUrl, []);
  const scheduleHref = calendlyUrl || `mailto:${siteConfig.owner.email}?subject=Meet%20and%20greet%20request`;
  const scheduleLabel = calendlyUrl ? "Open calendar" : "Email to schedule";

  const update = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const message = [
      `Meet and greet request for ${form.dogName}`,
      `Owner: ${form.ownerName}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Dog: ${form.dogName}`,
      `Breed: ${form.dogBreed}`,
      `Age: ${form.dogAge}`,
      form.preferredDays ? `Preferred days: ${form.preferredDays}` : null,
      form.preferredTimes ? `Preferred times: ${form.preferredTimes}` : null,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.ownerName,
          email: form.email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError(`I couldn't send that request. Please email ${siteConfig.owner.email} and I will arrange it manually.`);
    }
  };

  return (
    <>
      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={onSubmit} className="ww-card p-6 md:p-7">
              <h2 className="text-3xl leading-tight text-[var(--text)]">Send your dog&apos;s details</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Share a few details and I will confirm your meet and greet by email.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[var(--text)]">
                  Name
                  <input
                    required
                    type="text"
                    value={form.ownerName}
                    onChange={(event) => update("ownerName", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)]">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)]">
                  Phone (optional)
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)]">
                  Dog name
                  <input
                    required
                    type="text"
                    value={form.dogName}
                    onChange={(event) => update("dogName", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)]">
                  Dog breed
                  <input
                    required
                    type="text"
                    value={form.dogBreed}
                    onChange={(event) => update("dogBreed", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)]">
                  Dog age
                  <input
                    required
                    type="text"
                    value={form.dogAge}
                    onChange={(event) => update("dogAge", event.target.value)}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)] sm:col-span-2">
                  Notes
                  <textarea
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)] sm:col-span-2">
                  Preferred days
                  <input
                    type="text"
                    value={form.preferredDays}
                    onChange={(event) => update("preferredDays", event.target.value)}
                    placeholder="Example: Mon / Wed / Fri"
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>

                <label className="text-sm font-semibold text-[var(--text)] sm:col-span-2">
                  Preferred times
                  <input
                    type="text"
                    value={form.preferredTimes}
                    onChange={(event) => update("preferredTimes", event.target.value)}
                    placeholder="Example: weekday mornings"
                    className="mt-1 w-full rounded-lg border-2 border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--green)]"
                  />
                </label>
              </div>

              {status === "error" ? (
                <p className="mt-5 rounded-lg border-2 border-[rgba(200,83,56,0.24)] bg-white px-4 py-3 text-sm font-semibold text-[var(--deep-orange)]" role="alert">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-65">
                {status === "submitting" ? <span className="spinner" /> : <Icons.Send size={17} />}
                {status === "submitting" ? "Sending request" : "Send booking request"}
              </button>
            </form>

            <aside className="ww-card h-fit p-6 md:p-7">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(255,217,93,0.34)] text-[var(--deep-orange)]">
                <Icons.Calendar size={22} />
              </div>
              <h2 className="text-3xl leading-tight text-[var(--text)]">Prefer to schedule?</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Use the calendar link if you prefer to choose a time directly.
              </p>
              <Link
                href={scheduleHref}
                target={calendlyUrl ? "_blank" : undefined}
                rel={calendlyUrl ? "noreferrer" : undefined}
                className="btn-primary mt-6"
              >
                <Icons.ArrowRight size={17} /> {scheduleLabel}
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="ww-card p-6 md:p-7">
            <h2 className="text-3xl leading-tight text-[var(--text)]">Preferred schedule</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Share preferred days and times in the form above and I will confirm what fits.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="ww-card p-6 md:p-7">
            <h2 className="text-3xl leading-tight text-[var(--text)]">Confirmation</h2>
            {submitted ? (
              <p className="mt-4 text-sm leading-6 text-[var(--text)]">
                Thanks {form.ownerName}. Your request for {form.dogName} has been sent. I will reply to {form.email} to
                arrange your meet and greet.
              </p>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Submit the booking details above and your confirmation will appear here.
              </p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="ww-card ww-card-accent p-7 md:p-9">
            <h2 className="text-4xl leading-tight text-[var(--text)]">Contact fallback</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              If the form is not convenient, email{" "}
              <Link href={`mailto:${siteConfig.owner.email}`} className="font-black text-[var(--deep-green)]">
                {siteConfig.owner.email}
              </Link>{" "}
              and I will arrange your free meet and greet manually.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
