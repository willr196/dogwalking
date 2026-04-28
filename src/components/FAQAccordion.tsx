"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="ww-card divide-y divide-[var(--line)] overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-extrabold text-[var(--text)] transition-colors hover:bg-[rgba(255,217,93,0.16)]"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              >
                {item.question}
                <span aria-hidden="true" className="text-lg leading-none text-[var(--deep-orange)]">
                  {isOpen ? "-" : "+"}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm leading-6 text-[var(--muted)]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
