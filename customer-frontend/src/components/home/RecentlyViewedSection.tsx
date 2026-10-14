"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Course } from "@/types";
import { History, ArrowRight, PlayCircle, Star, Sparkles } from "lucide-react";
import { CourseUnlockModal } from "@/components/forms/CourseUnlockModal";

export const RecentlyViewedSection: React.FC = () => {
  const { courses, currentUser } = useDemo();
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [selectedCourseForUnlock, setSelectedCourseForUnlock] = useState<Course | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("ili_recent_courses");
      if (stored) {
        const slugs: string[] = JSON.parse(stored);
        if (Array.isArray(slugs) && slugs.length > 0) {
          const matched = slugs
            .map((s) => courses.find((c) => c.slug === s || c.id === s))
            .filter((c): c is Course => Boolean(c))
            .slice(0, 4);
          setRecentCourses(matched);
        }
      }
    } catch {}
  }, [courses]);

  if (recentCourses.length === 0) return null;

  const handleCourseClick = (e: React.MouseEvent, course: Course) => {
    // Clean up stale blanket bypass flags
    if (typeof window !== "undefined") {
      localStorage.removeItem("ili_visitor_verified");
      sessionStorage.removeItem("ili_lead_unlocked");
    }

    let isUnlocked = Boolean(currentUser);
    if (!isUnlocked && typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem("ili_unlocked_courses");
        const list: string[] = raw ? JSON.parse(raw) : [];
        isUnlocked = list.includes(course.slug);
      } catch {}
    }

    if (!isUnlocked) {
      e.preventDefault();
      setSelectedCourseForUnlock(course);
    }
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Recently Viewed by You
              </h2>
              <p className="text-xs text-slate-500">Pick up right where you left off</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {recentCourses.length} {recentCourses.length === 1 ? "Program" : "Programs"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentCourses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.slug}`}
              onClick={(e) => handleCourseClick(e, c)}
              className="group bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-sky-300 p-4 transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-200">
                  <img
                    src={c.coverImage}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white">
                    {c.language} &bull; {c.level}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 line-clamp-2 transition-colors">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>4.9</span>
                    <span className="text-slate-400 font-normal">({c.totalLectures} lectures)</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">
                  ₹{c.samplePrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Course & Syllabus</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Course Access Modal */}
      <CourseUnlockModal
        course={selectedCourseForUnlock}
        isOpen={Boolean(selectedCourseForUnlock)}
        onUnlocked={() => setSelectedCourseForUnlock(null)}
        onClose={() => setSelectedCourseForUnlock(null)}
      />
    </section>
  );
};
