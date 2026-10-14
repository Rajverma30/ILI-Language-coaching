"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Course } from "@/types";
import {
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  X,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

// Common typo & phonetic synonym mappings for Indian language aspirants
const SYNONYM_MAP: Record<string, string[]> = {
  german: ["grmn", "germn", "germany", "deutsch", "deutch", "deuch", "goethe", "gote", "a1", "a2", "b1", "b2"],
  english: ["englis", "inglish", "englsh", "eng", "ielts", "toefl", "exclusiv", "exclusive", "fluency", "business", "exclusve", "exclisive", "exclucive", "speaking", "spoken"],
  french: ["frensh", "frnch", "frnce", "francais", "frnc", "delf", "delph", "paris", "dalf"],
  spanish: ["spanis", "spnsh", "spain", "espanol", "dele", "madrid", "espanola"],
  japanese: ["japan", "japnese", "japn", "tokyo", "nihongo", "jlpt", "n5", "n4", "anime"],
};

function getLevenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const d: number[][] = [];

  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return d[m][n];
}

interface SmartCourseSearchProps {
  className?: string;
  onSelectCourse?: (course: Course) => void;
}

export const SmartCourseSearch: React.FC<SmartCourseSearchProps> = ({
  className = "",
  onSelectCourse,
}) => {
  const router = useRouter();
  const { courses } = useDemo();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick search keywords
  const popularChips = [
    { label: "German A1", q: "German A1" },
    { label: "Exclusive English", q: "Exclusive English" },
    { label: "French A1", q: "French" },
    { label: "Spanish A1", q: "Spanish" },
    { label: "Japanese N5", q: "Japanese" },
  ];

  // Fuzzy search algorithm with typo tolerance
  const { results, detectedSynonym } = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return { results: [], detectedSynonym: null };

    let synonymTarget: string | null = null;
    for (const [canonical, typos] of Object.entries(SYNONYM_MAP)) {
      if (raw.includes(canonical) || typos.some((t) => raw.includes(t) || getLevenshteinDistance(raw, t) <= 2)) {
        synonymTarget = canonical;
        break;
      }
    }

    const matched = courses.filter((c) => {
      const title = c.title.toLowerCase();
      const desc = c.shortDescription.toLowerCase();
      const lang = c.language.toLowerCase();
      const level = c.level.toLowerCase();
      const slug = c.slug.toLowerCase();

      // 1. Exact or partial substring match
      if (
        title.includes(raw) ||
        desc.includes(raw) ||
        lang.includes(raw) ||
        level.includes(raw) ||
        slug.includes(raw)
      ) {
        return true;
      }

      // 2. Synonym mapping match (e.g. 'grmn' -> German courses, 'exclusiv' -> Exclusive English)
      if (synonymTarget && (lang.includes(synonymTarget) || title.includes(synonymTarget))) {
        return true;
      }

      // 3. Typo-tolerant Levenshtein distance check on words
      const words = [...title.split(" "), ...lang.split(" "), ...level.split(" ")];
      for (const w of words) {
        const cleanWord = w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        if (cleanWord.length >= 3 && raw.length >= 3) {
          const dist = getLevenshteinDistance(cleanWord, raw);
          if (dist <= 2) return true;
        }
      }

      return false;
    });

    return { results: matched, detectedSynonym: synonymTarget };
  }, [query, courses]);

  const handleSelect = (course: Course) => {
    setIsOpen(false);
    setQuery("");
    if (onSelectCourse) {
      onSelectCourse(course);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0]);
    } else if (query.trim()) {
      router.push(`/courses?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative z-20">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/15 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
          <div className="pl-4 pr-2 text-sky-600 flex items-center justify-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search any course (e.g. Exclusive English, German A1, French, IELTS)..."
            className="w-full py-3.5 pr-10 text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="p-1.5 mr-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="hidden sm:inline-flex items-center gap-1.5 mr-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Quick Filter Suggestion Chips */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-sky-500" />
          <span>Popular:</span>
        </span>
        {popularChips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => {
              setQuery(chip.q);
              setIsOpen(true);
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/70 hover:border-sky-300 transition-all cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Floating Live Dropdown Preview */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {detectedSynonym && (
            <div className="px-4 py-2 bg-sky-50 border-b border-sky-100 text-[11px] font-semibold text-sky-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Smart typo matching applied for: <strong>{detectedSynonym}</strong></span>
            </div>
          )}

          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
              {results.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleSelect(course)}
                  className="p-3.5 hover:bg-sky-50/60 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {course.coverImage ? (
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold">
                        {course.language.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {course.language}
                        </span>
                        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                          {course.level}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors truncate mt-0.5">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {course.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-sky-600">
                      ₹{course.samplePrice.toLocaleString("en-IN")}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Instant LMS</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <p className="text-sm font-bold text-slate-800">
                No exact match found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching by language name (German, French, Spanish, English, Japanese) or level (A1, B1, IELTS).
              </p>
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors mt-2"
              >
                <span>Browse All Institute Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <Link
                href={`/courses?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                <span>View all {results.length} results in catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
