"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Course } from "@/types";
import {
  Sparkles,
  Flame,
  TrendingUp,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  BookOpen,
  Clock,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CourseUnlockModal } from "@/components/forms/CourseUnlockModal";

interface CourseRowSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeIcon: React.ReactNode;
  badgeColorClass: string;
  courses: Course[];
  categoryBadge: string;
  renderCard: (c: Course, categoryBadge?: string) => React.ReactNode;
  onViewAll: () => void;
}

const CourseRowSection: React.FC<CourseRowSectionProps> = ({
  title,
  subtitle,
  badgeText,
  badgeIcon,
  badgeColorClass,
  courses,
  categoryBadge,
  renderCard,
  onViewAll,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 370;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className={`flex items-center gap-2 ${badgeColorClass}`}>
            {badgeIcon}
            <span className="text-xs font-black uppercase tracking-wider">{badgeText}</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>

        {/* Small "View All" Button + Navigation Arrows */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally sliding container on both mobile and laptop/desktop */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((c) => (
          <div key={c.id} className="w-[300px] sm:w-[360px] shrink-0 snap-start">
            {renderCard(c, categoryBadge)}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CourseGallery: React.FC = () => {
  const router = useRouter();
  const { courses, currentUser } = useDemo();
  const [selectedCourseForUnlock, setSelectedCourseForUnlock] = useState<Course | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const languageTabs = ["All", "English", "German", "French", "Spanish", "Japanese"];

  // Filtered courses when specific language tab is picked
  const filteredTabCourses = activeFilter === "All"
    ? courses
    : courses.filter((c) => c.language.toLowerCase() === activeFilter.toLowerCase());

  // Group courses directly into showcases
  // Include English (like Exclusive English) so it appears across relevant showcases
  const famousCourses = courses.filter(
    (c) =>
      c.language === "English" ||
      c.title.includes("German A1") ||
      c.title.includes("French A1") ||
      c.title.includes("Spanish A1") ||
      c.featured
  );

  const newReleaseCourses = courses.filter(
    (c) =>
      c.language === "English" ||
      c.language === "Japanese" ||
      c.level === "B1" ||
      c.title.toLowerCase().includes("exclusive")
  );

  const careerCourses = courses.filter(
    (c) =>
      c.language === "English" ||
      c.language === "German" ||
      c.language === "French"
  );

  const handleCourseClick = (e: React.MouseEvent, course: Course) => {
    e.preventDefault();
    e.stopPropagation();

    // Clean up stale localStorage flag
    if (typeof window !== "undefined") {
      localStorage.removeItem("ili_visitor_verified");
    }

    const isVerified =
      Boolean(currentUser) ||
      (typeof window !== "undefined" && Boolean(sessionStorage.getItem("ili_lead_unlocked")));

    if (!isVerified) {
      setSelectedCourseForUnlock(course);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  const renderCourseCard = (c: Course, categoryBadge?: string) => (
    <div
      key={c.id}
      onClick={(e) => handleCourseClick(e, c)}
      className="bg-white/5 hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-sky-400 rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/15 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1.5 select-none h-full"
    >
      <div className="space-y-4">
        {/* Full Clickable Image Banner */}
        <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-800">
          <img
            src={c.coverImage}
            alt={c.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-[11px] font-black text-white shadow-sm">
              {c.language}
            </span>
            <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/10">
              Level {c.level}
            </span>
            {categoryBadge && (
              <span className="px-2 py-0.5 rounded-md bg-purple-600/90 text-[10px] font-bold text-white shadow-xs">
                {categoryBadge}
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 / 5.0</span>
            </span>
            <span className="text-[11px] text-white/70 font-mono">
              {c.sections?.length || 4} Modules &bull; {c.totalLectures} Lessons
            </span>
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
            {c.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {c.shortDescription}
          </p>
        </div>

        {/* Feature Pills */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            <span>Goethe / DELF Format</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-sky-400" />
            <span>{c.durationHours} Hours</span>
          </span>
        </div>
      </div>

      {/* Price & Action Button */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            Tuition Fee
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-white font-mono">
              ₹{c.samplePrice.toLocaleString("en-IN")}
            </span>
            {c.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                ₹{c.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => handleCourseClick(e, c)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 group-hover:bg-sky-500 text-white flex items-center gap-1.5 shadow-md shadow-sky-600/25 transition-all group-hover:translate-x-1 cursor-pointer pointer-events-auto"
        >
          <span>View Course & Syllabus</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Course Catalogues</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Explore Courses for Maximum Career Growth
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Click any course card or image below to instantly view syllabus, CEFR modules & sample classes.
          </p>

          {/* Interactive Language Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {languageTabs.map((tab) => {
              const count = tab === "All"
                ? courses.length
                : courses.filter((c) => c.language.toLowerCase() === tab.toLowerCase()).length;
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105 border border-sky-400"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {activeFilter !== "All" ? (
          <CourseRowSection
            title={`${activeFilter} Language Courses (${filteredTabCourses.length})`}
            subtitle={`Showing all active batches, syllabus and preview lectures for ${activeFilter}.`}
            badgeText={`${activeFilter} Programs`}
            badgeIcon={<Compass className="w-5 h-5 text-sky-400" />}
            badgeColorClass="text-sky-400"
            courses={filteredTabCourses}
            categoryBadge={activeFilter}
            renderCard={renderCourseCard}
            onViewAll={() => router.push("/courses")}
          />
        ) : (
          <>
            {/* SHOWCASE 1: MOST FAMOUS & POPULAR COURSES */}
            <CourseRowSection
              title="Most Famous & Top-Rated Batches"
              subtitle="Foundational A1 batches & Executive English with highest enrollment in Indore & Central India."
              badgeText="Most In-Demand Programs"
              badgeIcon={<Flame className="w-5 h-5 fill-amber-400" />}
              badgeColorClass="text-amber-400"
              courses={famousCourses}
              categoryBadge="Famous"
              renderCard={renderCourseCard}
              onViewAll={() => router.push("/courses")}
            />

            {/* SHOWCASE 2: NEW RELEASES & ADVANCED PROGRAMS */}
            <CourseRowSection
              title="New Releases & Advanced Curricula"
              subtitle="JLPT N5 Japanese, Goethe B1 exam specialization & Exclusive English Fluency."
              badgeText="Newly Introduced Curricula"
              badgeIcon={<Sparkles className="w-5 h-5 text-purple-400" />}
              badgeColorClass="text-purple-400"
              courses={newReleaseCourses}
              categoryBadge="New Release"
              renderCard={renderCourseCard}
              onViewAll={() => router.push("/courses")}
            />

            {/* SHOWCASE 3: CAREER & EUROPEAN VISA PROGRAMS */}
            <CourseRowSection
              title="Career Growth & European Visa Programs"
              subtitle="Targeted preparation for Germany Opportunity Card, Blue Card, Canada PR, IELTS & MNC jobs."
              badgeText="Jobseeker & Higher Education"
              badgeIcon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
              badgeColorClass="text-emerald-400"
              courses={careerCourses}
              categoryBadge="Career Visa"
              renderCard={renderCourseCard}
              onViewAll={() => router.push("/courses")}
            />
          </>
        )}

        {/* Global All Courses Button */}
        <div className="pt-6 text-center">
          <button
            type="button"
            onClick={() => router.push("/courses")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Course Access Modal with Dismiss Support */}
      <CourseUnlockModal
        course={selectedCourseForUnlock}
        isOpen={Boolean(selectedCourseForUnlock)}
        onUnlocked={() => setSelectedCourseForUnlock(null)}
        onClose={() => setSelectedCourseForUnlock(null)}
      />
    </section>
  );
};
