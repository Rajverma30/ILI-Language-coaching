"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Course } from "@/types";
import {
  Lock,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface CourseUnlockModalProps {
  course: Course | null;
  isOpen: boolean;
  onUnlocked?: () => void;
}

export const CourseUnlockModal: React.FC<CourseUnlockModalProps> = ({
  course,
  isOpen,
  onUnlocked,
}) => {
  const router = useRouter();
  const { addLead } = useDemo();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !course) return null;

  const handlePhoneChange = (val: string) => {
    setPhone(val.replace(/[^\d]/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = fullName.trim();
    const cleanDigits = phone.replace(/\D/g, "");

    if (!trimmedName) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (cleanDigits.length < 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    const formattedPhone = cleanDigits.length === 10 ? `+91${cleanDigits}` : `+${cleanDigits}`;
    const courseInterest = `${course.title} (${course.level})`;
    const fallbackEmail = `${cleanDigits}@visitor.ili.in`;

    const leadPayload = {
      fullName: trimmedName,
      phone: formattedPhone,
      email: fallbackEmail,
      courseInterest,
      preferredSlot: "Website Course Visitor (Immediate Interest)",
      preferredContactMethod: "WhatsApp" as const,
      message: `Course Page Visitor: Candidate clicked and unlocked course "${course.title}". Language: ${course.language}, Level: ${course.level}.`,
      source: `Course Page Visitor - ${course.title}`,
    };

    try {
      addLead(leadPayload);

      // Save unlocked credentials to sessionStorage for current session
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ili_lead_unlocked", "true");
        sessionStorage.setItem(
          "ili_lead_data",
          JSON.stringify({
            fullName: trimmedName,
            phone: formattedPhone,
            unlockedAt: new Date().toISOString(),
          })
        );
        // Clean up legacy persistent localStorage key so fresh visitors always see lead form
        localStorage.removeItem("ili_visitor_verified");
      }

      onUnlocked?.();
      router.push(`/courses/${course.slug}`);
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      style={{ pointerEvents: "auto" }}
      // Prevent outside click dismissal - UNCLOSABLE
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Ribbon */}
        <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600" />

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-1 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-100">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Course Access & Syllabus</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            View Course & Syllabus
          </h2>

          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Please enter your name & WhatsApp number to view curriculum, sample lectures & tuition fee for:
          </p>

          {/* Selected Course Pill */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-left text-xs">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-base shadow-2xs">
              <BookOpen className="w-4 h-4 text-sky-600" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-slate-900 block truncate">{course.title}</span>
              <span className="text-[10px] text-slate-500 font-medium">
                {course.language} &bull; Level {course.level} &bull; CEFR Certified
              </span>
            </div>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="my-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} className="pt-4 space-y-3.5" autoComplete="on">
          {/* Full Name */}
          <div className="space-y-1">
            <label
              htmlFor="unlock-full-name"
              className="flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span>Your Full Name</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">System auto-fill</span>
            </label>
            <input
              id="unlock-full-name"
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

          {/* WhatsApp Mobile Number */}
          <div className="space-y-1">
            <label
              htmlFor="unlock-mobile-phone"
              className="flex items-center justify-between text-xs font-bold text-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Mobile Number</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[10px] font-normal text-slate-400">10-digit number</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center gap-1 px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs">
                <span>🇮🇳</span>
                <span>+91</span>
              </span>
              <input
                id="unlock-mobile-phone"
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
              🔒 Instant syllabus PDF & batch timings will be sent to your WhatsApp.
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm cursor-pointer shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white shadow-indigo-600/25 ${
              isSubmitting ? "opacity-75 cursor-wait" : ""
            }`}
          >
            {isSubmitting ? (
              <span>Opening Course & Syllabus...</span>
            ) : (
              <>
                <span>View Course & Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Privacy Trust Bar */}
          <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Secure & Confidential &bull; Apollo Tower, Indore</span>
          </div>
        </form>
      </div>
    </div>
  );
};
