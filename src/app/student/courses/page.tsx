"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  PlayCircle,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function StudentCoursesPage() {
  const { currentStudent, courses, getStudentCourseProgress } = useDemo();

  const enrolledCourses = courses.filter((c) =>
    currentStudent?.enrolledCourseIds.includes(c.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Student Portal", href: "/student" },
            { label: "My Enrolled Courses" },
          ]}
        />
        <h1 className="font-editorial text-3xl font-extrabold text-[#0F1D38]">
          My Language Programs
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6479]">
          All active and completed courses linked to your student account. Click any course to resume recorded lectures.
        </p>
      </div>

      <div className="space-y-6">
        {enrolledCourses.map((c) => {
          const prog = getStudentCourseProgress(currentStudent?.id || "std-raj-1", c.id);
          const resumeLecId =
            currentStudent?.progress?.[c.id]?.lastLectureId ||
            c.sections?.[0]?.lectures?.[0]?.id ||
            "lec-ger-1-1";

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#D6CDC0] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="navy" size="sm">
                    {c.language}
                  </Badge>
                  <Badge variant="gold" size="sm">
                    Level {c.level}
                  </Badge>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active Enrollment
                  </span>
                </div>

                <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#0F1D38]">
                  {c.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5C6479] max-w-2xl line-clamp-2">
                  {c.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-5 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {c.durationHours} Hours Total
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                    {c.totalLectures} Recorded Lessons
                  </span>
                  <span>Faculty: {c.instructorName}</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2 max-w-md space-y-1">
                  <div className="flex justify-between text-xs text-stone-600 font-medium">
                    <span>Course Progress</span>
                    <span className="text-[#801D30] font-bold">{prog.percentage}% Complete</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#801D30] h-full rounded-full transition-all duration-300"
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex flex-col items-start md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                <Link
                  href={`/student/learn/${c.id}/${resumeLecId}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#0F1D38] text-white hover:bg-[#801D30] shadow-md transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-[#E0C17E]" />
                  <span>Enter Learning Player</span>
                </Link>

                <Link
                  href={`/courses/${c.slug}`}
                  className="text-xs font-semibold text-stone-600 hover:text-[#0F1D38] hover:underline"
                >
                  View Full Syllabus Preview
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
            Looking to add another foreign language?
          </h3>
          <p className="text-xs text-[#5C6479] mt-0.5">
            Discover French, Spanish, Japanese or corporate English courses at Apollo Tower, Indore.
          </p>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-white text-[#0F1D38] border border-[#E8E2D8] hover:bg-stone-50"
        >
          <span>Explore Course Catalogue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
