"use client";

import { useState } from "react";
import { Icons } from "@/components/willswalks/Icons";
import { siteConfig } from "@/lib/site.config";

const FAQ_ITEMS = [
  {
    q: "How long is each walk?",
    a: `Every walk is a full ${siteConfig.pricing.walkDuration} minutes. I never rush — your dog gets proper exercise and mental stimulation every session.`,
  },
  {
    q: "Do you offer solo and group walks?",
    a: `Yes. I offer solo walks and carefully managed small-group walks (max ${siteConfig.pricing.maxDogsPerWalk} dogs). Every dog starts with a meet & greet so I can recommend the best option.`,
  },
  {
    q: "Is a meet & greet required?",
    a: "Yes. It keeps walks safe and stress-free. It lets me learn your dog's temperament, routine, and any handling notes before the first walk.",
  },
  {
    q: "Will I get updates during the walk?",
    a: "Absolutely! I send photo updates during every walk so you can see your dog enjoying themselves. You'll never have to wonder how their walk went.",
  },
  {
    q: "Are you insured?",
    a: "I'm working on getting fully insured and will update my site as soon as it's in place. In the meantime, I take a safety-first approach on every walk.",
  },
  {
    q: "What areas do you cover?",
    a: `I'm based in Fulham and cover ${siteConfig.areasServed.map((a) => a.name).join(", ")}.`,
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
      <div className="ww-container">
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
