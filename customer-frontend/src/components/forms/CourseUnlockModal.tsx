"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Course } from "@/types";
import { X, ArrowRight } from "lucide-react";

interface CourseUnlockModalProps {
  course: Course | null;
  isOpen: boolean;
  onUnlocked?: () => void;
  onClose?: () => void;
}

export const CourseUnlockModal: React.FC<CourseUnlockModalProps> = ({
  course,
  isOpen,
  onUnlocked,
  onClose,
}) => {
  const router = useRouter();
  const { addLead } = useDemo();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Dismiss modal on Escape key or Browser Back button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    const handlePopState = () => {
      onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const handlePhoneChange = (val: string) => {
    setPhone(val.replace(/[^\d]/g, ""));
  };

  const handleDismiss = () => {
    if (onClose) {
      onClose();
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150 cursor-pointer"
      onClick={handleDismiss}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-150 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2 pb-4 border-b border-slate-100">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            View Course & Syllabus
          </h2>

          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
            Please enter your name & WhatsApp number to view curriculum, sample lectures & tuition fee for:
          </p>

          {/* Selected Course Pill */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
            <span className="font-bold text-slate-900 block truncate text-sm">
              {course.title}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {course.language} &bull; Level {course.level}
            </span>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="my-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Clean Simple Form */}
        <form onSubmit={handleSubmit} className="pt-4 space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="unlock-full-name"
              className="block text-xs font-bold text-slate-800"
            >
              Your Name <span className="text-red-500">*</span>
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
          </div>

          {/* WhatsApp Mobile Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="unlock-mobile-phone"
              className="block text-xs font-bold text-slate-800"
            >
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs">
                +91
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
                className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 ${
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
        </form>
      </div>
    </div>
  );
};
