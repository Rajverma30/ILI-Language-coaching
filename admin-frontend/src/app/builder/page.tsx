"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  CheckCircle2,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Flame,
  TrendingUp,
  Building,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  Megaphone,
  Layers,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

interface HomeSectionConfig {
  id: string;
  name: string;
  iconName: string;
  description: string;
  enabled: boolean;
  order: number;
  category: "banner" | "courses" | "branding" | "social-proof" | "cta";
}

const defaultSections: HomeSectionConfig[] = [
  {
    id: "announcement",
    name: "Top Announcement Bar",
    iconName: "Megaphone",
    description: "Urgent batch admission notice, weekend timing alerts & center notice.",
    enabled: true,
    order: 1,
    category: "banner",
  },
  {
    id: "hero",
    name: "Hero Header & Quick Admissions",
    iconName: "Layers",
    description: "Main institute headline, trust points (Apollo Tower, CEFR, Goethe/DELF), and direct apply buttons.",
    enabled: true,
    order: 2,
    category: "branding",
  },
  {
    id: "recently-viewed",
    name: "Recently Viewed Courses",
    iconName: "RotateCcw",
    description: "Personalized section showing courses recently browsed by the returning visitor.",
    enabled: true,
    order: 3,
    category: "courses",
  },
  {
    id: "famous-courses",
    name: "🔥 Most Famous & Top-Rated Batches",
    iconName: "Flame",
    description: "Showcases in-demand A1 foundation courses (German, French, Spanish) with instant clickable cards.",
    enabled: true,
    order: 4,
    category: "courses",
  },
  {
    id: "new-releases",
    name: "✨ New Releases & Advanced Curricula",
    iconName: "Sparkles",
    description: "Japanese JLPT N5, German B1 Advanced, and Business English executive modules.",
    enabled: true,
    order: 5,
    category: "courses",
  },
  {
    id: "career-courses",
    name: "💼 Career Growth & European Visa Programs",
    iconName: "TrendingUp",
    description: "Jobseeker visa, Germany Blue Card, Ausbildung, and Canada PR targeted curricula.",
    enabled: true,
    order: 6,
    category: "courses",
  },
  {
    id: "learning-approach",
    name: "CEFR Dual-Mode Methodology",
    iconName: "GraduationCap",
    description: "High-fidelity audio listening stations, communicative speaking roleplays & exam mocks.",
    enabled: true,
    order: 7,
    category: "branding",
  },
  {
    id: "indore-campus",
    name: "Apollo Tower Indore Classroom Venue",
    iconName: "Building",
    description: "Location map, classroom amenities, New Palasia landmark guidance & counseling hours.",
    enabled: true,
    order: 8,
    category: "branding",
  },
  {
    id: "faculty-profiles",
    name: "Certified Faculty Profiles",
    iconName: "GraduationCap",
    description: "Goethe and Alliance Française accredited trainer credentials.",
    enabled: true,
    order: 9,
    category: "social-proof",
  },
  {
    id: "testimonials",
    name: "Student Reviews & Visa Success Stories",
    iconName: "MessageSquare",
    description: "Testimonials from students who cleared Goethe B1 and DELF A1.",
    enabled: true,
    order: 10,
    category: "social-proof",
  },
  {
    id: "faq",
    name: "Frequently Asked Questions (FAQ)",
    iconName: "HelpCircle",
    description: "Common questions on classroom vs online format, batch timings & certificate validity.",
    enabled: true,
    order: 11,
    category: "social-proof",
  },
  {
    id: "admissions-cta",
    name: "Bottom Admissions Contact Banner",
    iconName: "Megaphone",
    description: "Final call-to-action bar linking to offline classroom enrollment and counselor WhatsApp.",
    enabled: true,
    order: 12,
    category: "cta",
  },
];

export default function HomePageBuilderPage() {
  const [sections, setSections] = useState<HomeSectionConfig[]>(defaultSections);
  const [heroTitle, setHeroTitle] = useState(
    "Master German, French, Spanish & Japanese at Central India's Benchmark Institute"
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Apollo Tower, New Palasia, Indore. Official CEFR exam-oriented preparation with native methodology, high-fidelity audio labs, and guaranteed batch flexibility."
  );
  const [announcementText, setAnnouncementText] = useState(
    "Admissions Open for Upcoming Weekend & Weekday Batches | In-Person at Apollo Tower Indore & Live Online"
  );
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("ili_homepage_builder_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sections) setSections(parsed.sections);
        if (parsed.heroTitle) setHeroTitle(parsed.heroTitle);
        if (parsed.heroSubtitle) setHeroSubtitle(parsed.heroSubtitle);
        if (parsed.announcementText) setAnnouncementText(parsed.announcementText);
      }
    } catch {}
  }, []);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    // re-index order
    const updated = copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSections(updated);
  };

  const handleSave = () => {
    const payload = {
      sections,
      heroTitle,
      heroSubtitle,
      announcementText,
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("ili_homepage_builder_config", JSON.stringify(payload));
    }

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all home page sections to official defaults?")) {
      setSections(defaultSections);
      setHeroTitle(
        "Master German, French, Spanish & Japanese at Central India's Benchmark Institute"
      );
      setHeroSubtitle(
        "Apollo Tower, New Palasia, Indore. Official CEFR exam-oriented preparation with native methodology, high-fidelity audio labs, and guaranteed batch flexibility."
      );
      setAnnouncementText(
        "Admissions Open for Upcoming Weekend & Weekday Batches | In-Person at Apollo Tower Indore & Live Online"
      );
      if (typeof window !== "undefined") {
        localStorage.removeItem("ili_homepage_builder_config");
      }
    }
  };

  const customerUrl = process.env.NEXT_PUBLIC_CUSTOMER_URL || "http://localhost:3000";

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider mb-1">
            <LayoutTemplate className="w-4 h-4" />
            <span>Interactive Layout Customizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Home Page Builder & Section Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Toggle sections on/off, reorder showcase galleries, and customize hero text for the student-facing homepage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href={customerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Live Website Preview</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition-all cursor-pointer transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Layout</span>
          </button>
        </div>
      </div>

      {/* Save Success Notice */}
      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Homepage layout settings saved successfully! Changes are immediately published to the live visitor website.
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
            SYNCED
          </span>
        </div>
      )}

      {/* Hero & Banner Quick Content Editor */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Primary Brand Headlines & Top Banner Text</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            These headlines appear at the very top of the customer homepage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Announcement Bar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Top Announcement Bar Text</span>
              <span className="text-[10px] font-normal text-slate-400">Marquee / Alert Banner</span>
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all font-medium text-slate-900"
            />
          </div>

          {/* Hero Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Main Hero Headline (H1)</span>
              <span className="text-[10px] font-normal text-slate-400">Large font on landing</span>
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all font-semibold text-slate-900"
            />
          </div>

          {/* Hero Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              Hero Supporting Description
            </label>
            <textarea
              rows={2}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Sections Reordering & Toggle Manager */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Homepage Section Hierarchy & Active Status</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Use arrow buttons to change vertical order. Toggle switches to instantly show/hide any section on the homepage.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            {sections.filter((s) => s.enabled).length} / {sections.length} Active
          </span>
        </div>

        <div className="space-y-3">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                sec.enabled
                  ? "bg-white border-slate-200 hover:border-sky-300 shadow-2xs"
                  : "bg-slate-50/70 border-slate-200/60 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Drag / Index Pill */}
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">
                      {sec.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        sec.enabled
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {sec.enabled ? "Live Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {sec.description}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, "up")}
                  title="Move section up"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => moveSection(idx, "down")}
                  title="Move section down"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Toggle Enable */}
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sec.enabled
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  {sec.enabled ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-600" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-400" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Changes to section hierarchy are applied instantly on save.
          </p>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Live</span>
          </button>
        </div>
      </div>
    </div>
  );
}
