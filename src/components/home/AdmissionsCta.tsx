import React from "react";
import Link from "next/link";
import { Sparkles, PhoneCall, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const AdmissionsCta: React.FC = () => {
  return (
    <section className="py-20 bg-[#0F1D38] text-white relative overflow-hidden">
      {/* Subtle luxury glow accents */}
      <div className="absolute top-0 right-0 -z-0 w-96 h-96 bg-[#801D30]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-0 w-80 h-80 bg-[#C5A059]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#E0C17E] text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Batches Enrolling This Month</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Transform Your Career & Global Education with Fluent Languages
        </h2>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of students in Indore who have mastered German, French, Spanish, Japanese, and Business English at Apollo Tower, New Palasia. Experience our interactive methodology firsthand.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/demo"
            variant="gradient"
            size="lg"
            leftIcon={<Sparkles className="w-4 h-4 text-white" />}
            rightIcon={
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
            }
          >
            Book Free Demo Session
          </Button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xs transition-all"
          >
            <MapPin className="w-4 h-4 text-[#E0C17E]" />
            <span>Visit Apollo Tower Center</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-[#E0C17E]" />
            <span>Admissions Desk: +91 98260 12345</span>
          </div>
          <span className="hidden sm:inline">&bull;</span>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp: +91 98260 12345</span>
          </div>
          <span className="hidden sm:inline">&bull;</span>
          <span>Apollo Tower, MG Road, New Palasia, Indore</span>
        </div>
      </div>
    </section>
  );
};
