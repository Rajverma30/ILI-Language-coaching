"use client";

import React, { useState } from "react";
import { demoFaqs } from "@/data/mockData";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-white border-b border-[#E8E2D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#801D30] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Queries</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#5C6479]">
            Everything you need to know about our Apollo Tower classroom sessions, batches, certificates, and online recorded learning portal.
          </p>
        </div>

        <div className="space-y-3.5">
          {demoFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? "border-[#801D30] bg-[#FAF8F5] shadow-xs"
                    : "border-[#E8E2D8] bg-white hover:border-[#D6CDC0]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-base sm:text-lg font-bold text-[#0F1D38]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-[#801D30] text-white rotate-180" : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5C6479] leading-relaxed border-t border-stone-200/50 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
