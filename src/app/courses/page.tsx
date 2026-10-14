"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  User,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export default function CoursesCataloguePage() {
  const { courses } = useDemo();

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "duration">("popular");

  const languages = ["All", "German", "French", "Spanish", "English", "Japanese"];
  const levels = ["All", "A1", "B1", "Advanced", "JLPT N5"];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        const matchesSearch =
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
          c.language.toLowerCase().includes(search.toLowerCase());

        const matchesLanguage = selectedLanguage === "All" || c.language === selectedLanguage;
        const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;

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
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "Courses Catalogue" }]} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF0F2] text-[#801D30] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CEFR Aligned Curricula</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#0F1D38]">
                Foreign Language Courses
              </h1>
              <p className="text-xs sm:text-sm text-[#5C6479] mt-1 max-w-2xl">
                Explore structured language learning paths for German, French, Spanish, Japanese, and Business English at Apollo Tower, Indore.
              </p>
            </div>

            <div className="text-xs text-stone-500 bg-white px-3 py-2 rounded-lg border border-[#E8E2D8] self-start md:self-auto">
              <span>Showing <strong>{filteredCourses.length}</strong> of {courses.length} courses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl border border-[#E8E2D8] p-4 mb-8 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Box */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses by language, exam (Goethe, DELF), or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-[#E8E2D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F1D38]"
              />
            </div>

            {/* Level Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E8E2D8] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F1D38]"
              >
                <option value="All">All Proficiency Levels</option>
                <option value="A1">A1 (Beginner)</option>
                <option value="B1">B1 (Intermediate)</option>
                <option value="Advanced">Advanced / C1</option>
                <option value="JLPT N5">JLPT N5</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "popular" | "price-asc" | "price-desc" | "duration")}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E8E2D8] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F1D38]"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration: Longest First</option>
              </select>
            </div>
          </div>

          {/* Language Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
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
                      ? "bg-[#0F1D38] text-white shadow-2xs"
                      : "bg-[#FAF8F5] text-stone-700 border border-[#E8E2D8] hover:bg-stone-200"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid */}
        {filteredCourses.length === 0 ? (
          <EmptyState
            title="No matching language courses found"
            description="Try modifying your search keywords or resetting filters to explore all available courses."
            actionLabel="Reset All Filters"
            onAction={() => {
              setSearch("");
              setSelectedLanguage("All");
              setSelectedLevel("All");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D6CDC0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-stone-200 overflow-hidden">
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
                  {course.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#801D30] text-white uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-editorial text-lg font-bold text-[#0F1D38] group-hover:text-[#801D30] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#5C6479] line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {course.durationHours} Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                        {course.totalLectures} Lessons
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        {course.enrolledStudentsCount} Learners
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{course.instructorName}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Sample Fee</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-base text-[#0F1D38]">
                            ₹{course.samplePrice.toLocaleString("en-IN")}*
                          </span>
                          {course.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{course.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0F1D38] text-white hover:bg-[#801D30] transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-4 rounded-xl bg-white border border-[#E8E2D8] text-center text-xs text-stone-500 max-w-2xl mx-auto">
          <p>
            * Fees, batch dates, and instructor designations are sample mock figures for evaluation. Final institute tariffs and schedule will be confirmed at Apollo Tower center counseling.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
