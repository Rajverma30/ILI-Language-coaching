"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import {
  BookOpen,
  PlayCircle,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { currentUser, currentStudent, courses, getStudentCourseProgress } = useDemo();

  const enrolledCourses = courses.filter((c) =>
    currentStudent?.enrolledCourseIds.includes(c.id)
  );

  // Calculate totals
  const totalCompletedLectures = enrolledCourses.reduce((acc, c) => {
    const prog = getStudentCourseProgress(currentStudent?.id || "std-raj-1", c.id);
    return acc + prog.completedCount;
  }, 0);

  const totalPossibleLectures = enrolledCourses.reduce(
    (acc, c) => acc + c.totalLectures,
    0
  );

  const overallProgressPercent =
    totalPossibleLectures > 0
      ? Math.round((totalCompletedLectures / totalPossibleLectures) * 100)
      : 0;

  // Active primary course for "Continue Learning"
  const activeCourse = enrolledCourses[0] || courses[0];
  const activeProgress = activeCourse
    ? getStudentCourseProgress(currentStudent?.id || "std-raj-1", activeCourse.id)
    : null;

  const nextLectureId =
    currentStudent?.progress?.[activeCourse?.id]?.lastLectureId ||
    activeCourse?.sections?.[0]?.lectures?.[0]?.id ||
    "lec-ger-1-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0F2] text-[#801D30] text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Student Portal</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
            Willkommen, {currentUser?.name || "Raj Verma"}!
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6479]">
            Enrolled at Apollo Tower, Indore Center. Keep up your daily language practice to achieve CEFR certification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/courses"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0F1D38] text-white hover:bg-[#1A2E56] transition-colors"
          >
            My Courses ({enrolledCourses.length})
          </Link>
          <Link
            href="/courses"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-[#0F1D38] border border-[#E8E2D8] hover:bg-stone-50 transition-colors"
          >
            Browse Catalogue
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Enrolled Courses</span>
            <BookOpen className="w-4 h-4 text-[#801D30]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {enrolledCourses.length}
          </div>
          <p className="text-[11px] text-stone-400">German A1 & Business English</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Lessons Finished</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {totalCompletedLectures}
          </div>
          <p className="text-[11px] text-stone-400">Recorded lessons verified</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {overallProgressPercent}%
          </div>
          <p className="text-[11px] text-stone-400">Across enrolled curricula</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Target Exam</span>
            <Award className="w-4 h-4 text-[#0F1D38]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            Goethe A1
          </div>
          <p className="text-[11px] text-stone-400">Upcoming Indore Exam Session</p>
        </div>
      </div>

      {/* Continue Learning Featured Card */}
      {activeCourse && (
        <div className="bg-linear-to-r from-[#0F1D38] to-[#1E3156] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E0C17E] text-xs font-bold uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" />
              <span>Resume Your Learning</span>
            </span>

            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
              {activeCourse.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Continue where you left off. Revisit vocabulary drills, sentence structure explanations, and the practice quiz for this module.
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2 max-w-md">
              <div className="flex justify-between text-xs text-stone-300">
                <span>Progress: {activeProgress?.percentage || 0}% Completed</span>
                <span>{activeProgress?.completedCount || 0} / {activeProgress?.totalLectures || 0} Lessons</span>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#E0C17E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeProgress?.percentage || 10}%` }}
                />
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/student/learn/${activeCourse.id}/${nextLectureId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#801D30] text-white hover:bg-[#9B283E] shadow-lg transition-all"
              >
                <PlayCircle className="w-4 h-4 text-[#E0C17E]" />
                <span>Launch Recorded Lesson Player</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Enrolled Courses Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#0F1D38]">
              Your Enrolled Language Programs
            </h2>
            <p className="text-xs text-stone-500">
              Access syllabus modules, watch lectures, and download worksheets.
            </p>
          </div>

          <Link
            href="/student/courses"
            className="text-xs font-bold text-[#801D30] hover:underline"
          >
            View Details &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((c) => {
            const prog = getStudentCourseProgress(currentStudent?.id || "std-raj-1", c.id);
            const targetLecId =
              currentStudent?.progress?.[c.id]?.lastLectureId ||
              c.sections?.[0]?.lectures?.[0]?.id ||
              "lec-ger-1-1";

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D6CDC0] p-6 shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF4E6] text-[#8C6D23]">
                      {c.language} ({c.level})
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {prog.percentage}% Complete
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
                    {c.title}
                  </h3>

                  <p className="text-xs text-[#5C6479] line-clamp-2">
                    {c.shortDescription}
                  </p>

                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#801D30] h-full rounded-full transition-all duration-300"
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="text-stone-500">
                    <span>{prog.completedCount} / {c.totalLectures} Lessons done</span>
                  </div>

                  <Link
                    href={`/student/learn/${c.id}/${targetLecId}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold bg-[#0F1D38] text-white hover:bg-[#1A2E56] transition-colors"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-[#E0C17E]" />
                    <span>Open Player</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
