import React from "react";
import Link from "next/link";
import { MapPin, Navigation, Clock, ShieldCheck, Check, ArrowRight } from "lucide-react";

export const IndoreCampus: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Indore Campus Hub</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-slate-900">
              Centrally Situated at Apollo Tower, New Palasia
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Located at the vibrant commercial and cultural crossroads of Indore on Mahatma Gandhi Road (opposite 56 Dukan area). Our campus is designed to give you an immersive academic environment away from noisy distractions.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Acoustically Optimized Language Labs</h4>
                  <p className="text-xs text-slate-500">
                    Headset stations designed for German Hören and DELF listening comprehension practice.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Prime Accessibility Across Indore</h4>
                  <p className="text-xs text-slate-500">
                    Easily commutable via iBus and metro routes from Vijay Nagar, Bhawarkua, Geeta Bhawan, and Rajwada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">International Library & Cultural Lounge</h4>
                  <p className="text-xs text-slate-500">
                    Original German, French, and Spanish literature, magazines, comics, and Goethe mock papers.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-200" />
                <span>Get Campus Directions & Hours</span>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline"
              >
                <span>Book In-Person Counseling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Card / Location Mockup */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                  Visit Us in Person
                </span>
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  Apollo Tower, MG Road, Indore
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Opposite 56 Dukan Road, New Palasia, Indore, MP - 452001
                </p>
              </div>

              {/* Campus Highlights list */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <span>Counseling Hours</span>
                  </div>
                  <span className="font-semibold text-slate-900">9:00 AM – 7:30 PM</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Demo & Orientation</span>
                  </div>
                  <span className="font-semibold text-emerald-800">Weekly Batches</span>
                </div>
              </div>

              {/* Map Preview Placeholder Box */}
              <div className="h-40 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00AFF5_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center mb-2 shadow-md z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-900 z-10">Apollo Tower, New Palasia</p>
                <p className="text-[11px] text-slate-500 z-10">MG Road Corridor, Indore 452001</p>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Walking distance from Palasia Square & 56 Dukan food street.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
