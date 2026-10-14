import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Award,
  Video,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      {/* Decorative Warm Ambient Background Elements */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#801D30]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-96 h-96 bg-[#C5A059]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] text-xs font-semibold text-[#801D30] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#801D30] animate-pulse" />
              <span>Indore&apos;s Benchmark Institute for Foreign Languages</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1D38] leading-[1.12] tracking-tight">
              Master Global Languages.{" "}
              <span className="text-[#801D30] italic font-serif">Open Global Frontiers.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5C6479] leading-relaxed max-w-2xl">
              Immersive <strong>German, French, Spanish, Japanese & Executive English</strong> coaching at Apollo Tower, MG Road, New Palasia, Indore. Structured for Goethe-Zertifikat, DELF, DELE, and IELTS exam distinction with hybrid recorded lecture revision.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-[#1E293B]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#801D30] shrink-0" />
                <span>Apollo Tower, Indore</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Max 12-15 per Batch</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0F1D38] shrink-0" />
                <span>CEFR A1 to C1 Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#801D30] shrink-0" />
                <span>Recorded LMS Revision</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Exam Mock Simulations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Dual Mode: Classroom & Online</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
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
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-[#0F1D38] border border-[#E8E2D8] hover:bg-[#FAF8F5] hover:border-stone-400 shadow-2xs transition-all"
              >
                <span>Browse Course Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Disclaimer for Demo */}
            <p className="text-[11px] text-stone-500 italic pt-1">
              * Interactive prototype for ILI Foreign Languages Institute. Demo credentials and course preview available.
            </p>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#801D30]">
                      Upcoming Batches
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
                      Apollo Tower Classroom & Live
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Seats Open
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F1D38]">German A1 (Goethe Blueprint)</h4>
                      <p className="text-[11px] text-stone-500">Starts Next Monday | 80 Hours | Indore Lab</p>
                    </div>
                    <span className="text-xs font-bold text-[#801D30]">₹14,500*</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F1D38]">French A1 (DELF Tout Public)</h4>
                      <p className="text-[11px] text-stone-500">Weekend Morning Batch | 75 Hours</p>
                    </div>
                    <span className="text-xs font-bold text-[#801D30]">₹13,500*</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F1D38]">Spanish A1 (DELE Certification)</h4>
                      <p className="text-[11px] text-stone-500">Weekday Evening | 70 Hours</p>
                    </div>
                    <span className="text-xs font-bold text-[#801D30]">₹12,500*</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F1D38]">Business English & IELTS Prep</h4>
                      <p className="text-[11px] text-stone-500">Executive Batch (Sat-Sun) | 60 Hours</p>
                    </div>
                    <span className="text-xs font-bold text-[#801D30]">₹9,500*</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">Demo Fees Pending Institute Confirmation</span>
                  <Link
                    href="/demo"
                    className="font-bold text-[#801D30] hover:underline flex items-center gap-1"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#0F1D38] text-white p-3.5 rounded-xl shadow-lg border border-[#1E3156] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C5A059] text-[#0F1D38] flex items-center justify-center font-bold text-sm">
                  10+
                </div>
                <div>
                  <p className="text-xs font-bold">Years Academic Excellence</p>
                  <p className="text-[10px] text-stone-400">Trusted Across Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
