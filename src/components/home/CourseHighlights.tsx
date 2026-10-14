"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Badge } from "@/components/ui/Badge";
import { Clock, BookOpen, User, ArrowRight, Sparkles } from "lucide-react";

export const CourseHighlights: React.FC = () => {
  const { courses } = useDemo();
  const highlightedCourses = courses.slice(0, 4);

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0F2] text-[#801D30] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Curricula</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
              Language Certification Programs
            </h2>
            <p className="text-sm sm:text-base text-[#5C6479] mt-2 max-w-2xl">
              CEFR-aligned language courses conducted at Apollo Tower, Indore and available with recorded online access for comprehensive mastery.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#801D30] hover:text-[#9B283E] transition-colors group"
          >
            <span>View All {courses.length} Languages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D6CDC0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Cover Image Container */}
              <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <Badge variant="navy" size="sm">
                    {course.language}
                  </Badge>
                  <Badge variant="gold" size="sm">
                    {course.level}
                  </Badge>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-editorial text-lg font-bold text-[#0F1D38] group-hover:text-[#801D30] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#5C6479] line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {course.durationHours} Hours
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                      {course.totalLectures} Lessons
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{course.instructorName}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Sample Fee</span>
                      <span className="font-bold text-sm text-[#0F1D38]">
                        ₹{course.samplePrice.toLocaleString("en-IN")}*
                      </span>
                    </div>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#801D30] hover:underline"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-stone-500">
            * All fee schedules, batch dates, and instructor profiles are sample demo data pending official confirmation by ILI Foreign Languages Institute, Apollo Tower, Indore.
          </p>
        </div>
      </div>
    </section>
  );
};
