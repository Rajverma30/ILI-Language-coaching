"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import {
  Languages,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { settings } = useDemo();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Institute Brand & Legal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ILI Coaching Institute"
                className="h-14 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/10"
              />
              <div>
                <span className="font-editorial text-xl font-bold text-white tracking-tight">
                  ILI Coaching Institute
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  {settings.legalName}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Central India&apos;s established language learning academy based in Indore. Providing communicative language proficiency, corporate linguistic coaching, and international exam preparations (Goethe-Zertifikat, DELF, DELE, IELTS).
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.landmark}, {settings.city}, {settings.state} - {settings.postalCode}, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{settings.phone} / {settings.altPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Language Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-editorial">
              Language Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/courses/german-a1-beginner" className="hover:text-white transition-colors">
                  German A1 (Goethe Exam Prep)
                </Link>
              </li>
              <li>
                <Link href="/courses/german-b1-intermediate" className="hover:text-white transition-colors">
                  German B1 (Intermediate)
                </Link>
              </li>
              <li>
                <Link href="/courses/french-a1-beginner" className="hover:text-white transition-colors">
                  French A1 (DELF Prep)
                </Link>
              </li>
              <li>
                <Link href="/courses/spanish-a1-beginner" className="hover:text-white transition-colors">
                  Spanish A1 (DELE Prep)
                </Link>
              </li>
              <li>
                <Link href="/courses/english-fluency-business" className="hover:text-white transition-colors">
                  Business English & IELTS
                </Link>
              </li>
              <li>
                <Link href="/courses/japanese-jlpt-n5" className="hover:text-white transition-colors">
                  Japanese N5 (JLPT Prep)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-editorial">
              Platform & Institute
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  All Courses Catalogue
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Indore Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Campus Location & Map
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sky-400 hover:text-sky-300 font-medium">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Your Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Frameworks */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-editorial">
              Standardization
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <Award className="w-4 h-4 text-sky-600" />
                  <span>CEFR Aligned</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Curricula strictly map to Common European Framework levels (A1, A2, B1, B2).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Official Prep Blueprint</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Goethe-Institut, Alliance Française, Instituto Cervantes exam patterns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>
              &copy; 2026 ILI Foreign Languages Institute Private Limited. Apollo Tower, MG Road, New Palasia, Indore, MP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>CIN: {settings.registrationNumber.split(" ")[0]}</span>
              <Link href="/contact" className="hover:text-slate-300">
                Privacy & Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
