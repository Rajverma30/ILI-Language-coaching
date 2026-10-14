import React from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Building2,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
  MapPin,
  Info,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "About Institute" }]} />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#801D30] text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Profile</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1D38]">
              ILI Foreign Languages Institute Private Limited
            </h1>

            <p className="text-sm sm:text-base text-[#5C6479] leading-relaxed">
              Established in Indore, Madhya Pradesh, to bridge Central Indian ambition with international academic and corporate mobility through mastery of world languages.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#801D30]">
              Our Foundation
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0F1D38]">
              Rooted in Central India, Oriented Toward the World
            </h2>
            <p className="text-sm text-[#5C6479] leading-relaxed">
              ILI Foreign Languages Institute was conceptualized with a single uncompromising premise: learning a foreign language must go beyond grammar rules on a whiteboard. It must equip learners with natural spoken reflexes, cultural understanding, and the rigorous phonetic discipline required to excel in international exam centers and global workplaces.
            </p>
            <p className="text-sm text-[#5C6479] leading-relaxed">
              Located on Mahatma Gandhi Road at Apollo Tower, New Palasia, our center serves students from across Madhya Pradesh — including Indore, Bhopal, Ujjain, and Dewas — who aspire to study at public universities in Germany, pursue hospitality in France, emigrate to Canada, or work in bilingual corporate roles.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D8]">
                <div className="text-2xl font-bold font-editorial text-[#0F1D38]">10+</div>
                <div className="text-xs text-stone-500 font-medium">Years Academic Legacy</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D8]">
                <div className="text-2xl font-bold font-editorial text-[#801D30]">800+</div>
                <div className="text-xs text-stone-500 font-medium">Exam Certifications</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8E2D8] p-7 shadow-lg space-y-6">
            <h3 className="font-editorial text-xl font-bold text-[#0F1D38]">
              Mission & Core Values
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#801D30] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Pedagogical Authenticity</h4>
                  <p className="text-stone-500 leading-relaxed">
                    Teaching aligned strictly with CEFR standards and accredited international bodies (Goethe-Institut, Alliance Française, Instituto Cervantes).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Small Cohort Integrity</h4>
                  <p className="text-stone-500 leading-relaxed">
                    Strict batch caps of 12-15 students to ensure meaningful individualized pronunciation drills and oral feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#0F1D38] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Dual-Mode Hybrid Access</h4>
                  <p className="text-stone-500 leading-relaxed">
                    Combining in-person language lab immersion in Indore with recorded digital lesson access for ongoing retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Indore Campus Advantage */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#801D30] border border-stone-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>Apollo Tower Campus Hub</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0F1D38]">
              Indore&apos;s Center for Foreign Language Training
            </h3>
            <p className="text-sm text-[#5C6479] leading-relaxed">
              Our campus in Apollo Tower, New Palasia, is centrally located for convenience, opposite the iconic 56 Dukan area. Designed with dedicated listening carrels, multimedia presentation spaces, and foreign language book collections, it offers an environment where serious learners thrive.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              <strong>Registered Office:</strong> Apollo Tower, MG Road, New Palasia, Indore, MP 452001
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#0F1D38] text-white hover:bg-[#1A2E56]"
            >
              <span>Visit Campus & Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Demo Platform Advisory */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
          <div className="space-y-1">
            <strong>Demonstrator Platform Advisory:</strong>
            <p className="leading-relaxed">
              The descriptions, faculty designations, and institutional milestones presented on this demo website represent editable placeholder content tailored for ILI Foreign Languages Institute Private Limited. Institute leadership can modify text and configurations through the Admin Settings portal.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
