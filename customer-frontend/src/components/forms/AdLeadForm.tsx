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
  MapPin,
  Clock,
  X,
  Globe,
  Building2,
  Laptop,
  Mail,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export type PlatformSource =
  | "Instagram Ads"
  | "WhatsApp Ads"
  | "YouTube Ads"
  | "Telegram"
  | "Website Form"
  | string;

interface AdLeadFormProps {
  initialSource?: PlatformSource;
  initialMode?: "offline" | "online";
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

const SUPPORTED_LANGUAGES = [
  { id: "German", name: "German", flag: "🇩🇪", popular: true, level: "A1 to C1 • Goethe" },
  { id: "French", name: "French", flag: "🇫🇷", popular: true, level: "DELF & TEF Canada" },
  { id: "Spanish", name: "Spanish", flag: "🇪🇸", popular: true, level: "DELE Certification" },
  { id: "Japanese", name: "Japanese", flag: "🇯🇵", popular: false, level: "JLPT N5 to N2" },
  { id: "English", name: "Spoken English", flag: "🇬🇧", popular: false, level: "Fluency & IELTS" },
  { id: "Italian", name: "Italian", flag: "🇮🇹", popular: false, level: "Conversational" },
  { id: "Russian", name: "Russian", flag: "🇷🇺", popular: false, level: "Standard Level" },
  { id: "Chinese", name: "Mandarin Chinese", flag: "🇨🇳", popular: false, level: "HSK Certified" },
] as const;

const OFFLINE_SLOTS = [
  "Morning Batch (8:00 AM – 10:00 AM)",
  "Noon Batch (12:00 PM – 2:00 PM)",
  "Evening Batch (6:00 PM – 8:00 PM)",
  "Weekend Intensive (Sat & Sun 10:00 AM – 2:00 PM)",
];

const ONLINE_SLOTS = [
  "Early Morning Batch (7:00 AM – 8:30 AM)",
  "Evening Working Batch (7:30 PM – 9:00 PM)",
  "Late Evening Batch (9:00 PM – 10:30 PM)",
  "Weekend Fast-Track (Sat & Sun 3:00 PM – 6:00 PM)",
];

export const AdLeadForm: React.FC<AdLeadFormProps> = ({
  initialSource = "Website Form",
  initialMode = "offline",
  title,
  subtitle,
  onClose,
}) => {
  const { addLead } = useDemo();

  // Mode Selection: "offline" = Apollo Tower Indore, "online" = Pan-India Live Interactive
  const [mode, setMode] = useState<"offline" | "online">(initialMode);
  const [source, setSource] = useState<PlatformSource>(initialSource);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("German");
  const [preferredSlot, setPreferredSlot] = useState<string>(OFFLINE_SLOTS[2]);
  const [learningGoal, setLearningGoal] = useState("job");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedLead, setSubmittedLead] = useState<{
    id?: string;
    fullName: string;
    phone: string;
    courseInterest: string;
    mode: "offline" | "online";
    slot: string;
    source: string;
  } | null>(null);

  // Update preferred slot when mode changes
  useEffect(() => {
    if (mode === "offline") {
      setPreferredSlot(OFFLINE_SLOTS[2]); // Default to 6-8 PM Evening
    } else {
      setPreferredSlot(ONLINE_SLOTS[1]); // Default to 7:30-9 PM Evening
    }
  }, [mode]);

  // Read URL parameters for source or prefilled data
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

    const urlMode = params.get("mode");
    if (urlMode === "online" || urlMode === "offline") {
      setMode(urlMode);
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
    const urlEmail = params.get("email");
    if (urlName) setFullName(urlName);
    if (urlPhone) setPhone(urlPhone);
    if (urlEmail) setEmail(urlEmail);
  }, []);

  const handlePhoneChange = (val: string) => {
    // Only accept numeric digits
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
    const modeLabel = mode === "offline" ? "Offline Classroom (Apollo Tower, Indore)" : "Live Online Interactive";
    const courseInterest = `${selectedLanguage} Certification [${mode === "offline" ? "Classroom Indore" : "Online Live"}]`;
    const fallbackEmail = email.trim() || `${cleanDigits}@lead.ili.in`;

    const leadPayload = {
      fullName: trimmedName,
      phone: formattedPhone,
      email: fallbackEmail,
      courseInterest,
      preferredSlot: `${preferredSlot} (${modeLabel})`,
      preferredContactMethod: "WhatsApp" as const,
      message: `Format: ${modeLabel}. Slot: ${preferredSlot}. Goal: ${learningGoal}. Language: ${selectedLanguage}.`,
      source,
    };

    try {
      // 1. Submit through frontend context (which automatically calls backend API once)
      addLead(leadPayload);

      setSubmittedLead({
        fullName: trimmedName,
        phone: formattedPhone,
        courseInterest,
        mode,
        slot: preferredSlot,
        source,
      });
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedLead) {
    const waText = encodeURIComponent(
      `Hello ILI Foreign Languages Institute! I just submitted an application for ${submittedLead.courseInterest}. My name is ${submittedLead.fullName}. Please send me the batch schedule and demo session details.`
    );
    const waLink = `https://wa.me/919826012345?text=${waText}`;

    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-9 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
          Demo Session Inquiry Registered
        </span>

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Thank You, {submittedLead.fullName}!
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed max-w-md mx-auto">
          Your inquiry has been received. A personalized confirmation has been sent to your WhatsApp number ({submittedLead.phone}). Our senior academic counselor will connect with you shortly.
        </p>

        {/* Lead Summary Card */}
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
            <span className="font-bold text-sky-700">{submittedLead.courseInterest}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Learning Mode:</span>
            <span className="font-semibold text-slate-800">
              {submittedLead.mode === "offline" ? "🏛️ Apollo Tower, Indore Center" : "💻 Live Online Interactive"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Preferred Batch:</span>
            <span className="font-semibold text-slate-800">{submittedLead.slot}</span>
          </div>
        </div>

        {/* Career Growth Callout Banner */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-indigo-100 text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-600 text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              High-Growth Career Language Programs
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Gain an unfair career advantage. Explore industry-aligned language certifications designed specifically for international jobs, European work visas & corporate MNC promotions:
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-slate-700">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇩🇪 German: High-Package Tech & Engineering Jobs in Germany
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇫🇷 French: Canada Express Entry PR & Global MNCs
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              🇯🇵 Japanese & 🇪🇸 Spanish Corporate Placements
            </span>
          </div>
        </div>

        {/* Primary CTA: Visit Website & Explore Career Courses */}
        <div className="space-y-3 pt-1">
          <Link
            href="/courses"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-sky-600/25 transition-all transform hover:-translate-y-0.5"
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
                setEmail("");
              }}
              className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
            >
              Submit another application
            </button>
          </div>
        </div>

        {/* Campus Trust Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            Apollo Tower, Indore
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            Active Admissions Desk
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Main Form Popup Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-5 sm:p-7 relative overflow-hidden">
        {/* Top Gradient Accent Ribbon */}
        <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-500" />

        {/* Close Button on Top-Right */}
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
        <div className="text-center pt-2 pb-4 space-y-1.5 border-b border-slate-100 px-2 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            <span>ILI Foreign Languages Institute &bull; Indore</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title || "Language Admissions & Demo Session"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto">
            {subtitle || "Select your coaching mode and reserve your seat for the upcoming batch orientation."}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="my-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* MODE SELECTOR TABS: Offline Classroom vs Online Live */}
        <div className="pt-4 pb-2">
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Select Coaching Format <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setMode("offline")}
              className={`py-3 px-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                mode === "offline"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  mode === "offline" ? "bg-sky-50 text-sky-600" : "bg-slate-200/60 text-slate-500"
                }`}
              >
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs leading-tight">Indore Classroom</span>
                <span className="block text-[10px] text-slate-400 font-normal">Apollo Tower Campus</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("online")}
              className={`py-3 px-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                mode === "online"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50 font-medium"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  mode === "online" ? "bg-indigo-50 text-indigo-600" : "bg-slate-200/60 text-slate-500"
                }`}
              >
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs leading-tight">Live Online</span>
                <span className="block text-[10px] text-slate-400 font-normal">Pan-India & Global</span>
              </div>
            </button>
          </div>

          {/* Mode Info Highlight Card */}
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-600">
            {mode === "offline" ? (
              <>
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  <strong>Classroom Training:</strong> 205-208 Apollo Tower, 2 MG Road, South Tukoganj, New Palasia, Indore. AC smart classrooms & native trainers.
                </span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>100% Live Interactive:</strong> Real-time speaking practice, recorded backup lectures on portal, and digital curriculum PDFs.
                </span>
              </>
            )}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="pt-2 space-y-4" autoComplete="on">
          {/* 1. Language Selection Chips */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span>Language Program</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-semibold text-sky-600">
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
                        ? "border-sky-500 bg-sky-50/90 ring-2 ring-sky-500/20 shadow-xs"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-lg">{lang.flag}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-sky-600" />}
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

          {/* 2. Full Name Input (Native Browser Autocomplete) */}
          <div className="space-y-1">
            <label
              htmlFor="lead-full-name"
              className="flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span>Full Name</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                Click for system auto-fill
              </span>
            </label>
            <input
              id="lead-full-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="e.g. Raj Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* 3. WhatsApp Mobile Number Input (Native Browser Autocomplete) */}
          <div className="space-y-1">
            <label
              htmlFor="lead-mobile-phone"
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
                id="lead-mobile-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                required
                maxLength={10}
                placeholder="98260 12345"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-xs sm:text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              🔒 Instant WhatsApp confirmation & demo access link will be sent to this number.
            </p>
          </div>

          {/* 4. Preferred Batch Timing Slot */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>{mode === "offline" ? "Classroom Batch Timing" : "Online Live Batch Timing"}</span>
            </label>

            <select
              value={preferredSlot}
              onChange={(e) => setPreferredSlot(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              {(mode === "offline" ? OFFLINE_SLOTS : ONLINE_SLOTS).map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Primary Learning Goal */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              Primary Learning Goal
            </label>
            <select
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="job">Study Abroad / Job Visa in Germany, France, EU</option>
              <option value="exam">Official Exam Certification (Goethe / DELF / DELE / JLPT)</option>
              <option value="career">Corporate & IT MNC Career Growth</option>
              <option value="hobby">Personal Interest & International Travel</option>
            </select>
          </div>

          {/* 6. Email (Optional) */}
          <div className="space-y-1">
            <label
              htmlFor="lead-email-addr"
              className="flex items-center justify-between text-xs font-medium text-slate-600"
            >
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Email Address <span className="text-slate-400 font-normal">(Optional)</span></span>
              </span>
            </label>
            <input
              id="lead-email-addr"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com (to receive syllabus PDF)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm cursor-pointer shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white shadow-sky-600/25 ${
              isSubmitting ? "opacity-75 cursor-wait" : ""
            }`}
          >
            {isSubmitting ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <span>
                  {mode === "offline"
                    ? "Book Indore Demo Session & Get Syllabus"
                    : "Book Online Demo Session & Get Syllabus"}
                </span>
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
            <span>⭐ 4.9/5 Rating (Indore)</span>
            <span>&bull;</span>
            <span>1,200+ Alumni</span>
          </div>
        </form>
      </div>

      {/* Campus Footer */}
      <div className="mt-4 text-center text-xs text-white/50 space-y-0.5">
        <p className="font-bold text-white/80">ILI Foreign Languages Institute</p>
        <p className="text-[11px]">205-208 Apollo Tower, 2 MG Road, South Tukoganj, Indore (MP)</p>
        <p className="font-mono text-[10px] text-white/40">Admissions Helpline: +91 98260 12345</p>
      </div>
    </div>
  );
};
