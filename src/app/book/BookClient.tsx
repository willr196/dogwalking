"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";

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
  const calendlyUrl = useMemo(
    () => siteConfig.calendlyUrl || "https://calendly.com/your-calendly-link",
    []
  );

  const update = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={onSubmit}>
              <h2 className="text-2xl leading-tight text-slate-900">Option A: Send details</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Share a few details and I will confirm your meet and greet by email.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-700">
                  Name
                  <input
                    required
                    type="text"
                    value={form.ownerName}
                    onChange={(event) => update("ownerName", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Phone (optional)
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Dog name
                  <input
                    required
                    type="text"
                    value={form.dogName}
                    onChange={(event) => update("dogName", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Dog breed
                  <input
                    required
                    type="text"
                    value={form.dogBreed}
                    onChange={(event) => update("dogBreed", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700">
                  Dog age
                  <input
                    required
                    type="text"
                    value={form.dogAge}
                    onChange={(event) => update("dogAge", event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700 sm:col-span-2">
                  Notes
                  <textarea
                    value={form.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700 sm:col-span-2">
                  Preferred days
                  <input
                    type="text"
                    value={form.preferredDays}
                    onChange={(event) => update("preferredDays", event.target.value)}
                    placeholder="Example: Mon / Wed / Fri"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>

                <label className="text-sm text-slate-700 sm:col-span-2">
                  Preferred times
                  <input
                    type="text"
                    value={form.preferredTimes}
                    onChange={(event) => update("preferredTimes", event.target.value)}
                    placeholder="Example: weekday mornings"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <button type="submit" className="btn-primary mt-6">
                Send booking request
              </button>
            </form>

            <aside className="lg:border-l lg:border-slate-200 lg:pl-6">
              <h2 className="text-2xl leading-tight text-slate-900">Option B: Prefer to schedule?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use the calendar link if you prefer to choose a time directly.
              </p>
              <Link href={calendlyUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6">
                Open calendar
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-3xl leading-tight text-slate-900">Preferred schedule</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            No heavy calendar widget here. Share preferred days and times in the form above and I will confirm.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-3xl leading-tight text-slate-900">Confirmation</h2>
          {submitted ? (
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Thanks {form.ownerName}. Your request for {form.dogName} has been recorded client-side. I will reply to{" "}
              {form.email} to arrange your meet and greet.
            </p>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Submit the booking details above and your confirmation will appear here.
            </p>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-3xl leading-tight text-slate-900">Contact fallback</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            If the form is not convenient, email <Link href={`mailto:${siteConfig.owner.email}`}>{siteConfig.owner.email}</Link>{" "}
            and I will arrange your free meet and greet manually.
          </p>
        </Container>
      </section>
    </>
  );
}
