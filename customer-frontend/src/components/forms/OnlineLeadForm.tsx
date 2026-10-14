"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import {
  CheckCircle2,
  Phone,
  User,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  X,
  Laptop,
  Globe,
  Sparkles,
} from "lucide-react";

export type PlatformSource =
  | "Instagram Ads"
  | "WhatsApp Ads"
  | "YouTube Ads"
  | "Telegram"
  | "Website Form"
  | string;

interface OnlineLeadFormProps {
  initialSource?: PlatformSource;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

const SUPPORTED_LANGUAGES = [
  { id: "German", name: "German", flag: "🇩🇪", level: "A1 to C1 • Goethe" },
  { id: "French", name: "French", flag: "🇫🇷", level: "DELF & TEF Canada" },
  { id: "Spanish", name: "Spanish", flag: "🇪🇸", level: "DELE Certification" },
  { id: "Japanese", name: "Japanese", flag: "🇯🇵", level: "JLPT N5 to N2" },
  { id: "English", name: "Spoken English", flag: "🇬🇧", level: "Fluency & IELTS" },
  { id: "Italian", name: "Italian", flag: "🇮🇹", level: "Conversational" },
  { id: "Russian", name: "Russian", flag: "🇷🇺", level: "Standard Level" },
  { id: "Chinese", name: "Mandarin Chinese", flag: "🇨🇳", level: "HSK Certified" },
] as const;

export const OnlineLeadForm: React.FC<OnlineLeadFormProps> = ({
  initialSource = "Website Form",
  title,
  subtitle,
  onClose,
}) => {
  const { addLead } = useDemo();

  const [source, setSource] = useState<PlatformSource>(initialSource);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("German");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedLead, setSubmittedLead] = useState<{
    fullName: string;
    phone: string;
    courseInterest: string;
  } | null>(null);

  // Read URL parameters
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get("source") || params.get("utm_source");
    if (urlSource) {
      if (urlSource.toLowerCase().includes("insta")) setSource("Instagram Ads");
      else if (urlSource.toLowerCase().includes("whats")) setSource("WhatsApp Ads");
      else if (urlSource.toLowerCase().includes("yout")) setSource("YouTube Ads");
      else if (urlSource.toLowerCase().includes("tele")) setSource("Telegram");
      else setSource(urlSource);
    }

    const urlLang = params.get("lang") || params.get("course");
    if (urlLang) {
      const match = SUPPORTED_LANGUAGES.find((l) =>
        urlLang.toLowerCase().includes(l.id.toLowerCase())
      );
      if (match) setSelectedLanguage(match.id);
    }

    const urlName = params.get("name") || params.get("fullName");
    const urlPhone = params.get("phone") || params.get("mobile");
    if (urlName) setFullName(urlName);
    if (urlPhone) setPhone(urlPhone);
  }, []);

  const handlePhoneChange = (val: string) => {
    const clean = val.replace(/[^\d]/g, "");
    setPhone(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = fullName.trim();
    const cleanDigits = phone.replace(/\D/g, "");

    if (!trimmedName) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (cleanDigits.length < 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp mobile number.");
      return;
    }

    setIsSubmitting(true);

    const formattedPhone = cleanDigits.length === 10 ? `+91${cleanDigits}` : `+${cleanDigits}`;
    const courseInterest = `${selectedLanguage} Live Online Interactive Course`;
    const fallbackEmail = `${cleanDigits}@online.ili.in`;

    const leadPayload = {
      fullName: trimmedName,
      phone: formattedPhone,
      email: fallbackEmail,
      courseInterest,
      preferredSlot: "Live Online Evening / Weekend Interactive",
      preferredContactMethod: "WhatsApp" as const,
      message: `Format: Live Online Interactive Course. Language: ${selectedLanguage}. Candidate: ${trimmedName}.`,
      source,
    };

    try {
      addLead(leadPayload);

      setSubmittedLead({
        fullName: trimmedName,
        phone: formattedPhone,
        courseInterest,
      });
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again or message us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedLead) {
    const waText = encodeURIComponent(
      `Hello ILI! I just registered for ${submittedLead.courseInterest}. My name is ${submittedLead.fullName}. Please share the live interactive batch schedule.`
    );
    const waLink = `https://wa.me/916265660387?text=${waText}`;

    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-9 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
          Live Online Registration Confirmed
        </span>

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Thank You, {submittedLead.fullName}!
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed max-w-md mx-auto">
          Your live online admission inquiry has been registered. A personalized confirmation with batch timings has been sent to your WhatsApp ({submittedLead.phone}).
        </p>

        {/* Lead Summary */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Student Name:</span>
            <span className="font-bold text-slate-900">{submittedLead.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">WhatsApp Number:</span>
            <span className="font-mono font-bold text-slate-900">{submittedLead.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Selected Program:</span>
            <span className="font-bold text-indigo-700">{submittedLead.courseInterest}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Learning Format:</span>
            <span className="font-semibold text-slate-800">💻 100% Live Interactive (Pan-India & Global)</span>
          </div>
        </div>

        {/* Career Growth Callout Banner */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-indigo-100 text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-indigo-600 text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              High-Growth Career Language Programs
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Boost your career with certified language mastery. We offer top industry-aligned courses designed specifically for international jobs, European work visas & corporate promotions:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-slate-700">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇩🇪 German: High-Package Tech & Engineering Jobs in Germany
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇫🇷 French: Canada Express Entry PR & Global MNCs
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇯🇵 Japanese: Automotive & Global IT Software Roles
            </span>
          </div>
        </div>

        {/* Primary CTA: Visit Website & Explore Career Courses */}
        <div className="space-y-3 pt-1">
          <Link
            href="/courses"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Visit Our Website & Explore Career Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-4 pt-1">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Need help? Chat on WhatsApp</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <span className="text-slate-300">&bull;</span>

            <button
              onClick={() => {
                setSubmittedLead(null);
                setFullName("");
                setPhone("");
              }}
              className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
            >
              Submit another inquiry
            </button>
          </div>
        </div>

        {/* Live Course Guarantees */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            Live Video Practice
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Small Interactive Batches
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-7 relative overflow-hidden">
        {/* Top Gradient Ribbon */}
        <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500" />

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            title="Close"
            aria-label="Close"
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        <div className="text-center pt-2 pb-3 space-y-1.5 border-b border-slate-100 px-2 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Laptop className="w-3.5 h-3.5 text-indigo-600" />
            <span>Live Online Interactive Coaching</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title || "Live Online Course Admissions"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto">
            {subtitle || "Join live interactive sessions from anywhere. Fill details below for batch schedule & curriculum."}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="my-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* 3 Simple Fast Fields */}
        <form onSubmit={handleSubmit} className="pt-2 space-y-4" autoComplete="on">
          {/* 1. Language Program Selection */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Select Language</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-semibold text-indigo-600">
                Selected: {selectedLanguage}
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/90 ring-2 ring-indigo-500/20 shadow-xs"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-lg">{lang.flag}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-600" />}
                    </div>
                    <span className="font-bold text-xs text-slate-900 leading-tight block truncate">
                      {lang.name}
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                      {lang.level}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Full Name Input */}
          <div className="space-y-1">
            <label
              htmlFor="online-lead-name"
              className="flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>Full Name</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                System auto-fill
              </span>
            </label>
            <input
              id="online-lead-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="e.g. Raj Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* 3. WhatsApp Mobile Number */}
          <div className="space-y-1">
            <label
              htmlFor="online-lead-phone"
              className="flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Mobile Number</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                10-digit number
              </span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center gap-1 px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs">
                <span>🇮🇳</span>
                <span>+91</span>
              </span>
              <input
                id="online-lead-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                required
                maxLength={10}
                placeholder="98260 12345"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-xs sm:text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              🔒 Instant WhatsApp batch details & syllabus will be sent to this number.
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm cursor-pointer shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-600/25 ${
              isSubmitting ? "opacity-75 cursor-wait" : ""
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <span>Get Live Online Batch Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Confidential
            </span>
            <span>&bull;</span>
            <span>Live Interactive Audio/Video</span>
            <span>&bull;</span>
            <span>Portal Recorded Access</span>
          </div>
        </form>
      </div>

      {/* Online Campus Footer */}
      <div className="mt-4 text-center text-xs text-white/50 space-y-0.5">
        <p className="font-bold text-white/80">ILI Live Online Language Academy</p>
        <p className="text-[11px]">Pan-India & International Interactive Batches</p>
        <p className="font-mono text-[10px] text-white/40">WhatsApp Helpline: +91 62656 60387</p>
      </div>
    </div>
  );
};
