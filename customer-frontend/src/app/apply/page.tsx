"use client";

import React from "react";
import Link from "next/link";
import { Building2, Laptop, ArrowRight, MapPin, Globe, Sparkles, CheckCircle2 } from "lucide-react";

export default function ApplyHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-sky-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
      </div>

      {/* Top Header */}
      <div className="max-w-4xl mx-auto text-center pt-8 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-sky-300">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>ILI Foreign Languages Institute Admissions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Choose Your Learning Format
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Dedicated admission forms for in-person classroom batches at Indore campus and live online interactive coaching.
        </p>
      </div>

      {/* 2 Primary Destination Cards */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-4">
        {/* Card 1: Indore Offline Classroom */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-2">
                Indore Campus Center
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Offline Classroom Coaching
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Study in-person at our modern smart classrooms at Apollo Tower, Indore. Complete hands-on speaking drills, native trainers, and batch interaction.
              </p>
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>205-208 Apollo Tower, 2 MG Road, Indore</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Morning, Noon, Evening & Weekend Batches</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10">
            <Link
              href="/apply/offline"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all transform group-hover:translate-x-1"
            >
              <span>Open Indore Classroom Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card 2: Live Online Interactive */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Laptop className="w-7 h-7" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
                Pan-India & Global
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Live Online Coaching
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                100% Live interactive audio/video sessions. Small batch sizes with certified faculty, recorded lecture backups, and digital syllabus notes.
              </p>
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Fast 3-Field Instant Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>German, French, Spanish, Japanese & More</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10">
            <Link
              href="/apply/online"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all transform group-hover:translate-x-1"
            >
              <span>Open Live Online Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center py-4 text-xs text-slate-500 border-t border-white/5 w-full">
        <p>ILI Foreign Languages Institute &bull; Apollo Tower, Indore &bull; Helpline: +91 62656 60387</p>
      </div>
    </div>
  );
}
