"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { CourseUnlockModal } from "@/components/forms/CourseUnlockModal";
import { Course } from "@/types";
import {
  Search,
  Clock,
  BookOpen,
  User,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  GraduationCap,
  X,
} from "lucide-react";

export default function CoursesCataloguePage() {
  const { courses, currentUser } = useDemo();

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "duration">("popular");
  const [selectedCourseForUnlock, setSelectedCourseForUnlock] = useState<Course | null>(null);

  const handleCourseClick = (e: React.MouseEvent, course: Course) => {
    // Clean up stale localStorage flag
    if (typeof window !== "undefined") {
      localStorage.removeItem("ili_visitor_verified");
    }

    const isVerified =
      Boolean(currentUser) ||
      (typeof window !== "undefined" && Boolean(sessionStorage.getItem("ili_lead_unlocked")));

    if (!isVerified) {
      e.preventDefault();
      setSelectedCourseForUnlock(course);
    }
  };

  const languages = ["All", "German", "French", "Spanish", "English", "Japanese"];
  const levels = ["All", "A1", "B1", "Advanced", "JLPT N5"];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          c.title.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query) ||
          c.language.toLowerCase().includes(query);

        const matchesLanguage = selectedLanguage === "All" || c.language.toLowerCase() === selectedLanguage.toLowerCase();
        const matchesLevel = selectedLevel === "All" || c.level.toLowerCase().includes(selectedLevel.toLowerCase());

        return matchesSearch && matchesLanguage && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.samplePrice - b.samplePrice;
        if (sortBy === "price-desc") return b.samplePrice - a.samplePrice;
        if (sortBy === "duration") return b.durationHours - a.durationHours;
        return (b.enrolledStudentsCount || 0) - (a.enrolledStudentsCount || 0);
      });
  }, [courses, search, selectedLanguage, selectedLevel, sortBy]);

  return (
    <PublicLayout>
      {/* Header section with branding, breadcrumbs, and quick links */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <Breadcrumbs items={[{ label: "Courses Catalogue" }]} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>CEFR Aligned Curricula</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Foreign Language Courses
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Explore structured language learning paths for German, French, Spanish, Japanese, and Business English at Apollo Tower, Indore.
              </p>
            </div>

            {/* Clearly identifiable Book Demo Class & Student Portal shortcuts */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
              <Button
                href="/apply/offline"
                variant="gradient"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-white" />}
                rightIcon={
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                }
              >
                Offline Classroom Batch
              </Button>

              <Link
                href="/student"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <span>Student Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Compact Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-8 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by language, certification (Goethe, DELF), or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-600 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Proficiency Level Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-600 transition-all cursor-pointer"
              >
                <option value="All">All Proficiency Levels</option>
                <option value="A1">A1 (Beginner)</option>
                <option value="B1">B1 (Intermediate)</option>
                <option value="Advanced">Advanced / C1</option>
                <option value="JLPT N5">JLPT N5</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "popular" | "price-asc" | "price-desc" | "duration")}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-600 transition-all cursor-pointer"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-asc">Fee: Low to High</option>
                <option value="price-desc">Fee: High to Low</option>
                <option value="duration">Duration: Longest First</option>
              </select>
            </div>
          </div>

          {/* Language Chips & Active Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                Language:
              </span>
              {languages.map((lang) => {
                const active = selectedLanguage === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                      active
                        ? "bg-sky-600 text-white shadow-2xs font-semibold"
                        : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500">
              Showing <strong className="text-slate-900 font-semibold">{filteredCourses.length}</strong> of {courses.length} courses
            </div>
          </div>
        </div>

        {/* Courses Grid: 3 columns desktop (lg), 2 columns tablet (md), 1 column mobile */}
        {filteredCourses.length === 0 ? (
          <EmptyState
            title="No matching language courses found"
            description="Try modifying your search terms or clearing the selected language or proficiency filters."
            actionLabel="Reset All Filters"
            onAction={() => {
              setSearch("");
              setSelectedLanguage("All");
              setSelectedLevel("All");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-sky-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Standardized Card Image Header */}
                <div className="relative aspect-16/10 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <Badge variant="navy" size="sm">
                      {course.language}
                    </Badge>
                    <Badge variant="gold" size="sm">
                      {course.level}
                    </Badge>
                  </div>

                  {course.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white uppercase tracking-wider shadow-2xs">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    {/* Course Metrics */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {course.durationHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        {course.totalLectures} Lessons
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {course.enrolledStudentsCount} Learners
                      </span>
                    </div>

                    {/* Instructor Info */}
                    {course.instructorName && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{course.instructorName}</span>
                      </div>
                    )}

                    {/* Pricing & Explore Course Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                          Sample Fee
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-base text-slate-900">
                            ₹{course.samplePrice.toLocaleString("en-IN")}*
                          </span>
                          {course.originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{course.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        onClick={(e) => handleCourseClick(e, course)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-2xs cursor-pointer"
                      >
                        <span>Explore Course</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Center counseling advisory */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500 max-w-2xl mx-auto shadow-2xs">
          <p>
            * Fees, batch schedules, and instructor designations are sample figures for evaluation. Final institute tariffs and timings are confirmed at Apollo Tower center counseling.
          </p>
        </div>
      </section>

      {/* Unclosable Course Unlock Modal Gate for Non-Logged-in Visitors */}
      <CourseUnlockModal
        course={selectedCourseForUnlock}
        isOpen={Boolean(selectedCourseForUnlock)}
        onUnlocked={() => setSelectedCourseForUnlock(null)}
      />
    </PublicLayout>
  );
}
