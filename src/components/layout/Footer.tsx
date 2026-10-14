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
    <footer className="bg-[#0A1325] text-stone-300 border-t border-[#1A2E56] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Institute Brand & Legal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#801D30] text-white flex items-center justify-center shadow-md">
                <Languages className="w-5 h-5 text-[#E0C17E]" />
              </div>
              <div>
                <span className="font-editorial text-xl font-bold text-white tracking-tight">
                  ILI Foreign Languages Institute
                </span>
                <span className="block text-[11px] font-medium text-stone-400">
                  {settings.legalName}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              Central India&apos;s established language learning academy based in Indore. Providing communicative language proficiency, corporate linguistic coaching, and international exam preparations (Goethe-Zertifikat, DELF, DELE, IELTS).
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E0C17E] shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.landmark}, {settings.city}, {settings.state} - {settings.postalCode}, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E0C17E] shrink-0" />
                <span>{settings.phone} / {settings.altPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E0C17E] shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E0C17E] shrink-0" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Language Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-editorial">
              Language Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
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
            <ul className="space-y-2.5 text-xs text-stone-400">
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
                <Link href="/demo" className="text-[#E0C17E] hover:underline font-medium">
                  Book Free Demo Class
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student Portal Login
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors">
                  Administrative Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Frameworks */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 font-editorial">
              Standardization
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="p-3 rounded-lg bg-[#111F38] border border-[#1E3156]">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <Award className="w-4 h-4 text-[#E0C17E]" />
                  <span>CEFR Aligned</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-normal">
                  Curricula strictly map to Common European Framework levels (A1, A2, B1, B2).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#111F38] border border-[#1E3156]">
                <div className="flex items-center gap-1.5 text-white font-medium mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Official Prep Blueprint</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-normal">
                  Goethe-Institut, Alliance Française, Instituto Cervantes exam patterns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Honest Demo Notice */}
        <div className="pt-8 border-t border-[#1E3156] space-y-4">
          <div className="bg-[#111F38]/80 p-4 rounded-xl border border-[#1E3156] text-xs text-stone-400">
            <div className="flex items-start gap-2.5">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase text-[10px] tracking-wide shrink-0">
                Evaluation Demo Notice
              </span>
              <p className="leading-relaxed">
                This website and learning management portal is an interactive client prototype built for <strong>ILI Foreign Languages Institute Private Limited, Apollo Tower, Indore</strong>. Courses, fee numbers, sample schedules, and faculty profiles represent mock demo data prepared for architectural and workflow demonstration. External integrations (MongoDB Atlas, Bunny Stream, Razorpay, WhatsApp Business) are prepared via service boundaries.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <p>
              &copy; 2026 ILI Foreign Languages Institute Private Limited. Apollo Tower, MG Road, New Palasia, Indore, MP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>CIN: {settings.registrationNumber.split(" ")[0]}</span>
              <Link href="/contact" className="hover:text-stone-300">
                Privacy & Terms Placeholder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
