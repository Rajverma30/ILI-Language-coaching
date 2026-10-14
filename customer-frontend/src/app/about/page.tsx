import React from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Building2,
  Award,
  Users,
  Compass,
  MapPin,
  Info,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "About Institute" }]} />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider border border-sky-100">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Profile</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
              ILI Foreign Languages Institute Private Limited
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Established in Indore, Madhya Pradesh, to bridge Central Indian ambition with international academic and corporate mobility through mastery of world languages.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Our Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Rooted in Central India, Oriented Toward the World
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              ILI Foreign Languages Institute was conceptualized with a single uncompromising premise: learning a foreign language must go beyond grammar rules on a whiteboard. It must equip learners with natural spoken reflexes, cultural understanding, and the rigorous phonetic discipline required to excel in international exam centers and global workplaces.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Located on Mahatma Gandhi Road at Apollo Tower, New Palasia, our center serves students from across Madhya Pradesh — including Indore, Bhopal, Ujjain, and Dewas — who aspire to study at public universities in Germany, pursue hospitality in France, emigrate to Canada, or work in bilingual corporate roles.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">10+</div>
                <div className="text-xs text-slate-500 font-medium">Years Academic Legacy</div>
              </div>
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                <div className="text-2xl font-bold text-sky-700">800+</div>
                <div className="text-xs text-sky-900 font-medium">Exam Certifications</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-7 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Mission & Core Values
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Pedagogical Authenticity</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Teaching aligned strictly with CEFR standards and accredited international bodies (Goethe-Institut, Alliance Française, Instituto Cervantes).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Small Cohort Integrity</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Strict batch caps of 12-15 students to ensure meaningful individualized pronunciation drills and oral feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Dual-Mode Hybrid Access</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Combining in-person language lab immersion in Indore with recorded digital lesson access for ongoing retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Indore Campus Advantage */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-sky-700 border border-slate-200 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>Apollo Tower Campus Hub</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Indore&apos;s Center for Foreign Language Training
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our campus in Apollo Tower, New Palasia, is centrally located for convenience, opposite the iconic 56 Dukan area. Designed with dedicated listening carrels, multimedia presentation spaces, and foreign language book collections, it offers an environment where serious learners thrive.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <strong>Registered Office:</strong> Apollo Tower, MG Road, New Palasia, Indore, MP 452001
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-xs transition-colors"
            >
              <span>Visit Campus & Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Demo Platform Advisory */}
        <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 text-sky-600 mt-0.5" />
          <div className="space-y-1">
            <strong>Demonstrator Platform Advisory:</strong>
            <p className="leading-relaxed text-sky-900">
              The descriptions, faculty designations, and institutional milestones presented on this demo website represent editable placeholder content tailored for ILI Foreign Languages Institute Private Limited. Institute leadership can modify text and configurations through the Admin Settings portal.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
