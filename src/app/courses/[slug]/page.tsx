"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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

  if (!course) {
    return (
      <PublicLayout>
        <div className="max-w-3xl mx-auto py-20 px-4 text-center">
          <h1 className="font-editorial text-2xl font-bold text-[#0F1D38] mb-3">
            Course Not Found
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            The requested language curriculum could not be found in our database.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F1D38] text-white text-xs font-semibold"
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

  const handleSimulatedEnroll = () => {
    if (!currentUser) {
      router.push(`/login?redirect=/courses/${course.slug}`);
      return;
    }

    const order = createDemoOrder(course.id, course.samplePrice);
    setLastReceipt(order.receiptNumber);
    setEnrollSuccess(true);
  };

  return (
    <PublicLayout>
      {/* Top Breadcrumb & Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs
            items={[
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="navy">{course.language}</Badge>
                <Badge variant="gold">{course.level}</Badge>
                <span className="text-xs font-medium text-stone-500">
                  Apollo Tower Classroom & Online Dual-Mode
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1D38] leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-[#5C6479] leading-relaxed">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#801D30]" />
                  <span><strong>{course.durationHours}</strong> Hours Course</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#801D30]" />
                  <span><strong>{course.totalLectures}</strong> Recorded Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#801D30]" />
                  <span>{course.instructorName}</span>
                </div>
              </div>
            </div>

            {/* Quick Pricing Card on Desktop */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E8E2D8] shadow-lg p-6 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                  Demo Sample Tuition Fee
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#0F1D38] font-editorial">
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

              <div className="space-y-2.5 pt-2">
                {isAlreadyEnrolled ? (
                  <Link
                    href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "lec-ger-1-1"}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-[#0F1D38] text-white hover:bg-[#1A2E56] shadow-md transition-all text-center"
                  >
                    <PlayCircle className="w-4 h-4 text-[#E0C17E]" />
                    <span>Continue Learning Course</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setEnrollModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-[#801D30] text-white hover:bg-[#9B283E] shadow-md transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#E0C17E]" />
                    <span>Enrol in Demo Class / Reserve Seat</span>
                  </button>
                )}

                <Link
                  href={`/demo?course=${encodeURIComponent(course.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-[#0F1D38] border border-[#E8E2D8] hover:bg-[#FAF8F5] transition-all text-center"
                >
                  <span>Book Free Trial Session</span>
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
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Description, Highlights, Curriculum */}
          <div className="lg:col-span-8 space-y-10">
            {/* Detailed Description */}
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                Course Overview & Objectives
              </h2>
              <p className="text-sm text-[#5C6479] leading-relaxed">
                {course.fullDescription}
              </p>

              <div className="pt-4 space-y-3">
                <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
                  Key Competencies You Will Acquire
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-[#801D30] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-700 leading-normal">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum Preview Section */}
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                    Curriculum & Module Syllabus
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {course.sections.length} Modules &bull; {course.totalLectures} Recorded Lessons
                  </p>
                </div>

                <span className="text-xs font-semibold text-[#801D30] bg-[#FAF0F2] px-3 py-1 rounded-full self-start">
                  CEFR Standard Structure
                </span>
              </div>

              <div className="space-y-4">
                {course.sections.map((section, idx) => {
                  const isExpanded = expandedSectionIds[section.id] ?? false;
                  return (
                    <div
                      key={section.id}
                      className="rounded-xl border border-[#E8E2D8] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="w-full text-left p-4 bg-[#FAF8F5] hover:bg-stone-100/70 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#801D30] block">
                            Module {idx + 1}
                          </span>
                          <h3 className="font-editorial text-base font-bold text-[#0F1D38]">
                            {section.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                            {section.lectures.length} lessons
                          </span>
                          <div
                            className={`w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5 text-stone-600" />
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="divide-y divide-stone-100 bg-white">
                          {section.lectures.map((lec) => (
                            <div
                              key={lec.id}
                              className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-[#FAF8F5]/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                {lec.isFreePreview ? (
                                  <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Lock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-[#0F1D38]">
                                      {lec.title}
                                    </span>
                                    {lec.isFreePreview && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                                        Free Preview
                                      </span>
                                    )}
                                  </div>
                                  {lec.summary && (
                                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                      {lec.summary}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 text-stone-500">
                                <span className="font-mono">{lec.duration}</span>
                                {lec.isFreePreview && (
                                  <Link
                                    href={`/student/learn/${course.id}/${lec.id}`}
                                    className="font-bold text-[#801D30] hover:underline"
                                  >
                                    Preview &rarr;
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites & Certificate Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-2">
                <h3 className="font-editorial text-lg font-bold text-[#0F1D38] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#801D30]" />
                  <span>Prerequisites</span>
                </h3>
                <p className="text-xs text-[#5C6479] leading-relaxed">
                  {course.prerequisites}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-2">
                <h3 className="font-editorial text-lg font-bold text-[#0F1D38] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Certification</span>
                </h3>
                <p className="text-xs text-[#5C6479] leading-relaxed">
                  {course.certificateInfo}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Instructor & Center Information */}
          <div className="lg:col-span-4 space-y-6">
            {/* Instructor Profile Card */}
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#801D30] block">
                Lead Language Faculty
              </span>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-stone-200 overflow-hidden shrink-0 border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                    alt={course.instructorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial font-bold text-base text-[#0F1D38]">
                    {course.instructorName}
                  </h3>
                  <p className="text-xs text-[#801D30] font-medium">
                    {course.instructorTitle}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#5C6479] leading-relaxed">
                {course.instructorBio}
              </p>

              <div className="pt-2 text-[10px] text-stone-400 italic">
                * Representative sample instructor profile for demonstration.
              </div>
            </div>

            {/* Offline Campus Location Card */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                Classroom Venue
              </span>
              <h4 className="font-editorial font-bold text-base text-[#0F1D38]">
                Apollo Tower, Indore Center
              </h4>
              <p className="text-xs text-[#5C6479] leading-relaxed">
                Mahatma Gandhi Road, New Palasia, Indore, MP 452001. Equipped with high-fidelity listening lab stations and air-conditioned classrooms.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#801D30] hover:underline"
                >
                  View Map & Directions &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Enrollment Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0F1D38] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E2D8] relative">
            <button
              onClick={() => {
                setEnrollModalOpen(false);
                setEnrollSuccess(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#0F1D38] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!enrollSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF0F2] text-[#801D30] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
                      Simulated Demo Enrollment
                    </h3>
                    <p className="text-xs text-[#5C6479]">
                      Razorpay Checkout & Instant Portal Access
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Course:</span>
                    <strong className="text-right text-stone-900">{course.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Sample Price:</span>
                    <strong className="text-[#801D30]">₹{course.samplePrice.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Student Account:</span>
                    <span className="text-stone-900 font-medium">
                      {currentUser ? currentUser.name : "Please login first"}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-normal">
                  <strong>Notice:</strong> This transaction executes a simulated Razorpay mock. No real money will be charged, and your demo student session will be enrolled in this course for immediate exploration.
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnrollModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSimulatedEnroll}
                    leftIcon={<CreditCard className="w-4 h-4" />}
                  >
                    Confirm Demo Enrollment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#0F1D38]">
                  Demo Enrollment Activated!
                </h3>
                <p className="text-xs text-[#5C6479] max-w-xs mx-auto">
                  Receipt: <strong>{lastReceipt}</strong>. You have been granted demo access to recorded lessons and lecture notes.
                </p>

                <div className="pt-3 flex flex-col gap-2">
                  <Link
                    href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "lec-ger-1-1"}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-[#0F1D38] text-white hover:bg-[#1A2E56]"
                  >
                    <PlayCircle className="w-4 h-4 text-[#E0C17E]" />
                    <span>Enter Recorded Learning Player</span>
                  </Link>
                  <Link
                    href="/student/courses"
                    className="text-xs font-medium text-stone-600 hover:underline"
                  >
                    Go to My Enrolled Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
