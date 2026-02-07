"use client";

import { useState } from "react";
import { Icons } from "@/components/willswalks/Icons";

const FAQ_ITEMS = [
  {
    q: "How long is each walk?",
    a: "Every walk is a full 60 minutes of one-on-one time with your dog. I never rush — your dog gets proper exercise and mental stimulation every single session.",
  },
  {
    q: "Why solo walks instead of group walks?",
    a: "Solo walks mean your dog gets my complete attention. No pack stress, no distractions, no risk of incidents with other dogs. It's safer, calmer, and far more enriching.",
  },
  {
    q: "Will I get updates during the walk?",
    a: "Absolutely! I send photo updates during every walk so you can see your dog enjoying themselves. You'll never have to wonder how their walk went.",
  },
  {
    q: "Are you insured and DBS checked?",
    a: "Yes — I'm fully insured for professional dog walking and have a clean DBS (criminal record) check. Happy to share documentation on request.",
  },
  {
    q: "What areas do you cover?",
    a: "I'm based in Fulham and cover SW6 and surrounding areas including Parsons Green, Walham Green, Sands End, Bishop's Park, and Hurlingham.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ww-green/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left bg-transparent border-none cursor-pointer group"
        aria-expanded={open}
      >
        <span className="text-[1rem] font-semibold text-ww-text pr-4">{q}</span>
        <span
          className="shrink-0 transition-transform duration-250 ease-in-out"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <Icons.ChevronDown size={20} color="var(--green)" />
        </span>
      </button>
      {open && (
        <div className="pb-5 px-1 anim-slide-down">
          <p className="text-ww-muted text-[15px] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="ww-section bg-ww-warm-white">
      <div className="ww-container-narrow">
        <h2 className="ww-serif ww-title text-center mb-3">
          Common Questions
        </h2>
        <p className="ww-lede text-center mb-10">
          Everything you need to know before booking.
        </p>
        <div className="ww-card p-[clamp(20px,3vw,32px)]">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
