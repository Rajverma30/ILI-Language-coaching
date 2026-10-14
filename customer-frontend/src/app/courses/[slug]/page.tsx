"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CourseUnlockModal } from "@/components/forms/CourseUnlockModal";
import { startRazorpayCheckout } from "@/lib/razorpay";
import {
  Clock,
  BookOpen,
  User,
  Award,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PlayCircle,
  FileText,
  Lock,
  X,
  CreditCard,
  Play,
  Film,
  Video,
} from "lucide-react";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { getCourseBySlug, currentUser, currentStudent, createDemoOrder } = useDemo();

  const course = getCourseBySlug(slug);

  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>({
    "sec-ger-1": true,
    "sec-fre-1": true,
    "sec-spa-1": true,
    "sec-eng-1": true,
  });

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Unclosable modal gate for non-logged-in visitors (starts closed until verified)
  const [isAccessUnlocked, setIsAccessUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Logged in students always have full access
    if (currentUser) {
      setIsAccessUnlocked(true);
      return;
    }
    // Clean up any stale persistent localStorage flag
    localStorage.removeItem("ili_visitor_verified");
    // Check if user has unlocked in the current browser session
    const sessionUnlocked = sessionStorage.getItem("ili_lead_unlocked") === "true";
    setIsAccessUnlocked(sessionUnlocked);
  }, [currentUser]);

  // Ensure all course sections for any course (including newly added courses) are expanded by default
  useEffect(() => {
    if (course?.sections) {
      setExpandedSectionIds((prev) => {
        const next = { ...prev };
        course.sections.forEach((s, idx) => {
          if (idx === 0 || prev[s.id] === undefined) {
            next[s.id] = true;
          }
        });
        return next;
      });
    }
  }, [course]);

  // Track recent course views into localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !course) return;
    try {
      const raw = localStorage.getItem("ili_recent_courses");
      let list: string[] = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      list = [course.slug, ...list.filter((s) => s !== course.slug && s !== course.id)].slice(0, 10);
      localStorage.setItem("ili_recent_courses", JSON.stringify(list));
    } catch {}
  }, [course]);

  if (!course) {
    return (
      <PublicLayout>
        <div className="max-w-3xl mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Course Not Found
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            The requested language curriculum could not be found in our database.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            &larr; Back to Course Catalogue
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const toggleSection = (id: string) => {
    setExpandedSectionIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAlreadyEnrolled = currentStudent?.enrolledCourseIds.includes(course.id);

  const handleRazorpayEnroll = async () => {
    if (!currentUser) {
      router.push(`/login?redirect=/courses/${course.slug}`);
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError("");

    try {
      await startRazorpayCheckout({
        course,
        currentUser,
        currentStudent,
        onSuccess: (receiptNumber) => {
          setIsProcessingPayment(false);
          createDemoOrder(course.id, course.samplePrice);
          setLastReceipt(receiptNumber);
          setEnrollSuccess(true);
        },
        onError: (errMsg) => {
          setIsProcessingPayment(false);
          setPaymentError(errMsg);
        },
        onDismiss: () => {
          setIsProcessingPayment(false);
        },
      });
    } catch (err: any) {
      setIsProcessingPayment(false);
      setPaymentError(err.message || "Failed to start payment.");
    }
  };

  return (
    <PublicLayout>
      <div className="bg-slate-50/40 min-h-screen py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <Breadcrumbs
            items={[
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (8 cols): Title & Stats, then DIRECTLY Curriculum, Overview, Prerequisites */}
            <div className="lg:col-span-8 space-y-6">
              {/* Course Title & Overview Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="navy">{course.language}</Badge>
                  <Badge variant="gold">{course.level}</Badge>
                  <span className="text-xs font-medium text-slate-500">
                    Apollo Tower Classroom & Online Dual-Mode
                  </span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {course.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-3 text-xs sm:text-sm text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <span><strong>{course.durationHours}</strong> Hours Course</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span><strong>{course.totalLectures}</strong> Recorded Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-sky-600" />
                    <span>{course.instructorName}</span>
                  </div>
                </div>
              </div>

              {/* Curriculum Preview Section (DIRECTLY BELOW TITLE - NO GAP) */}
              <div id="curriculum" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 scroll-mt-24 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Curriculum & Module Syllabus
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {course.sections.length} Modules &bull; {course.totalLectures} Recorded Lessons
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full self-start border border-sky-100">
                    CEFR Standard Structure
                  </span>
                </div>

                {/* 2 Free Sample Classes Callout Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <PlayCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-extrabold text-emerald-950 text-sm">
                        2 Free Preview Classes Unlocked for You
                      </p>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Check teaching style, faculty pronunciation & listening exercises without paying anything upfront.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "lec-ger-1-1"}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-sm transition-all"
                  >
                    <span>Play Sample Class 1</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-4">
                {course.sections.map((section, idx) => {
                  const isExpanded = expandedSectionIds[section.id] ?? false;
                  return (
                    <div
                      key={section.id}
                      className="rounded-xl border border-slate-200 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-sky-50/40 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 block">
                            Module {idx + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">
                            {section.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                            {section.lectures.length} lessons
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {section.lectures.map((lec, lecIdx) => {
                            const isPlayable = lec.isFreePreview || isAlreadyEnrolled;
                            const lectureContent = (
                              <div
                                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs transition-all duration-200 group cursor-pointer ${
                                  isPlayable
                                    ? "hover:bg-emerald-50/50 bg-white"
                                    : "hover:bg-slate-50/80 bg-slate-50/30"
                                }`}
                              >
                                {/* Left Side: Real Video Player Thumbnail & Info */}
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                  {/* Video Thumbnail Box */}
                                  <div className="relative w-24 sm:w-28 h-16 sm:h-18 rounded-xl bg-slate-900 border border-slate-700/80 overflow-hidden flex items-center justify-center shrink-0 shadow-sm group-hover:border-sky-500 group-hover:shadow-md transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950/60" />

                                    {/* Video Center Play / Lock Icon */}
                                    <div className="relative z-10">
                                      {isPlayable ? (
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-115 group-hover:bg-emerald-400 transition-transform">
                                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                                        </div>
                                      ) : (
                                        <div className="w-8 h-8 rounded-full bg-slate-800/90 text-slate-400 border border-slate-700 flex items-center justify-center group-hover:border-slate-600 transition-colors">
                                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                                        </div>
                                      )}
                                    </div>

                                    {/* Video Label Badge on Thumbnail */}
                                    <span className="absolute top-1 left-1.5 px-1 py-0.2 rounded bg-black/70 text-[8px] font-black uppercase tracking-wider text-sky-300">
                                      VIDEO
                                    </span>

                                    {/* Duration Timestamp on Thumbnail (like YouTube/Netflix) */}
                                    <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono font-bold text-white tracking-tight">
                                      {lec.duration}
                                    </span>
                                  </div>

                                  {/* Lecture Details */}
                                  <div className="space-y-1.5 min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        Lesson {lecIdx + 1}
                                      </span>
                                      {lec.isFreePreview ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                                          <Play className="w-2.5 h-2.5 fill-emerald-700" />
                                          <span>FREE VIDEO CLASS - CLICK TO PLAY</span>
                                        </span>
                                      ) : isAlreadyEnrolled ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                                          <CheckCircle2 className="w-2.5 h-2.5 text-sky-600" />
                                          <span>UNLOCKED</span>
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                          <Lock className="w-2.5 h-2.5 text-slate-400" />
                                          <span>Enroll to Unlock Full Video</span>
                                        </span>
                                      )}
                                    </div>

                                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors line-clamp-1">
                                      {lec.title}
                                    </h4>

                                    {lec.summary && (
                                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                        {lec.summary}
                                      </p>
                                    )}

                                    <div className="pt-0.5 flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                                      <span className="flex items-center gap-1">
                                        <Film className="w-3 h-3 text-sky-500" />
                                        <span>Full HD 1080p Recorded Studio Class</span>
                                      </span>
                                      <span className="hidden sm:inline">&bull;</span>
                                      <span className="hidden sm:inline">Dual-Mode Audio Revision</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Side Action CTA Button */}
                                <div className="shrink-0 flex items-center justify-end sm:justify-center pt-2 sm:pt-0">
                                  {isPlayable ? (
                                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 group-hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 group-hover:scale-102 transition-all">
                                      <Play className="w-3.5 h-3.5 fill-white" />
                                      <span>Watch Class ({lec.duration})</span>
                                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs bg-slate-100 group-hover:bg-sky-50 text-slate-600 group-hover:text-sky-700 border border-slate-200 group-hover:border-sky-300 transition-all">
                                      <Lock className="w-3 h-3 text-slate-400 group-hover:text-sky-600" />
                                      <span>Click to Unlock Video</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );

                            return isPlayable ? (
                              <Link
                                key={lec.id}
                                href={`/student/learn/${course.id}/${lec.id}`}
                                className="block"
                                title={`Play video: ${lec.title}`}
                              >
                                {lectureContent}
                              </Link>
                            ) : (
                              <div
                                key={lec.id}
                                onClick={() => setEnrollModalOpen(true)}
                                title="Click anywhere to unlock this video course"
                              >
                                {lectureContent}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Description & Competencies (Below Syllabus) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Course Overview & Objectives
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.fullDescription}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Key Competencies You Will Acquire
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-normal">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prerequisites & Certificate Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Prerequisites</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.prerequisites}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
                <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-600" />
                  <span>Certification</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.certificateInfo}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing, Instructor & Center Information */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Pricing Card on Desktop */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Course Tuition & Certification Fee
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 font-editorial">
                    ₹{course.samplePrice.toLocaleString("en-IN")}*
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{course.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500">
                  Includes study material, mock evaluations & recorded LMS access
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="#curriculum"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 shadow-xs transition-all text-center group cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Watch 2 Free Sample Classes (Unlocked)</span>
                </a>

                {isAlreadyEnrolled ? (
                  <Link
                    href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "lec-ger-1-1"}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-sky-600 text-white hover:bg-sky-700 shadow-md transition-all text-center"
                  >
                    <PlayCircle className="w-4 h-4 text-sky-200" />
                    <span>Continue Learning Course</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setEnrollModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs bg-sky-600 text-white hover:bg-sky-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Buy Course & Enroll Now • ₹{course.samplePrice.toLocaleString("en-IN")}</span>
                  </button>
                )}

                <Link
                  href={`/apply/offline?course=${encodeURIComponent(course.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100 transition-all text-center"
                >
                  <span>Indore Apollo Tower Offline Classroom Batch &rarr;</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Goethe / DELF mock exam included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Apollo Tower audio lab access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lifetime recorded lecture review</span>
                </div>
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                Lead Language Faculty
              </span>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                    alt={course.instructorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial font-bold text-base text-slate-900">
                    {course.instructorName}
                  </h3>
                  <p className="text-xs text-sky-600 font-medium">
                    {course.instructorTitle}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {course.instructorBio}
              </p>

              <div className="pt-2 text-[10px] text-slate-400 italic">
                * Representative sample instructor profile for demonstration.
              </div>
            </div>

            {/* Offline Campus Location Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                Classroom Venue
              </span>
              <h4 className="font-editorial font-bold text-base text-slate-900">
                Apollo Tower, Indore Center
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mahatma Gandhi Road, New Palasia, Indore, MP 452001. Equipped with high-fidelity listening lab stations and air-conditioned classrooms.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  View Map & Directions &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Official Course Purchase & Enrollment Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => {
                setEnrollModalOpen(false);
                setEnrollSuccess(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-slate-900">
                      Complete Course Enrollment
                    </h3>
                    <p className="text-xs text-slate-500">
                      Razorpay Instant Checkout & LMS Access Activation
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program:</span>
                    <strong className="text-right text-slate-900">{course.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Course Tuition:</span>
                    <strong className="text-sky-600 text-sm">₹{course.samplePrice.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Student Account:</span>
                    <span className="text-stone-900 font-medium">
                      {currentUser ? currentUser.name : "Please login first"}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 leading-normal">
                  <strong>Includes:</strong> Complete recorded video lessons, listening lab audio exercises, Goethe/DELF exam preparation kit, and verified completion certification.
                </div>

                {paymentError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
                    {paymentError}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isProcessingPayment}
                    onClick={() => {
                      setPaymentError("");
                      setEnrollModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isProcessingPayment}
                    onClick={handleRazorpayEnroll}
                    leftIcon={<CreditCard className="w-4 h-4" />}
                  >
                    {isProcessingPayment ? "Connecting Razorpay..." : "Pay with Razorpay & Enroll"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Course Enrollment Activated!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Official Admission ID: <strong>{lastReceipt}</strong>. Your LMS account now has full lifetime access to all lectures and exercises.
                </p>

                <div className="pt-3 flex flex-col gap-2">
                  <Link
                    href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "lec-ger-1-1"}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-colors"
                  >
                    <PlayCircle className="w-4 h-4 text-white" />
                    <span>Enter Recorded Learning Player</span>
                  </Link>
                  <Link
                    href="/student/courses"
                    className="text-xs font-medium text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    Go to My Enrolled Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Access Gate for Non-Logged-In Direct Visitors */}
      <CourseUnlockModal
        course={course}
        isOpen={!isAccessUnlocked}
        onUnlocked={() => setIsAccessUnlocked(true)}
        onClose={() => router.push("/courses")}
      />
    </PublicLayout>
  );
}
