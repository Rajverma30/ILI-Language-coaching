"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  PlusCircle,
  Layers,
  Edit3,
  Trash2,
  ExternalLink,
  BookOpen,
  Eye,
} from "lucide-react";

export default function AdminCoursesListPage() {
  const { courses, deleteCourse } = useDemo();

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.language.toLowerCase().includes(search.toLowerCase());
      const matchLang = selectedLanguage === "All" || c.language === selectedLanguage;
      return matchSearch && matchLang;
    });
  }, [courses, search, selectedLanguage]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the demo curriculum?`)) {
      deleteCourse(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Course Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage language courses, curriculum modules, recorded video links, and tuition fees.
          </p>
        </div>

        <Link
          href="/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-xs transition-colors self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none"
          >
            <option value="All">All Languages</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
          </select>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            {filteredCourses.length} Courses
          </span>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Course Program</th>
                <th className="py-3 px-4">Language & Level</th>
                <th className="py-3 px-4">Curriculum</th>
                <th className="py-3 px-4">Enrolled</th>
                <th className="py-3 px-4">Visitors</th>
                <th className="py-3 px-4">Sample Tuition</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => {
                const visitorCount =
                  course.visitorCount ||
                  course.views ||
                  (course.id === "course-ger-1"
                    ? 1248
                    : course.id === "course-ger-2"
                    ? 890
                    : course.id === "course-fre-1"
                    ? 1054
                    : course.id === "course-spa-1"
                    ? 940
                    : course.id === "course-eng-1"
                    ? 1680
                    : course.id === "course-jpn-1"
                    ? 620
                    : Math.floor((course.enrolledStudentsCount || 10) * 19 + 145));

                return (
                  <tr key={course.id} className="hover:bg-sky-50/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-12 h-10 rounded-md object-cover bg-slate-200 shrink-0"
                        />
                        <div>
                          <h3 className="font-bold text-slate-900 line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 truncate max-w-xs">
                            {course.instructorName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="navy" size="sm">
                          {course.language}
                        </Badge>
                        <Badge variant="gold" size="sm">
                          {course.level}
                        </Badge>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div><strong>{course.sections.length}</strong> Modules</div>
                      <div className="text-[11px] text-slate-400">{course.totalLectures} Lessons &bull; {course.durationHours}h</div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {course.enrolledStudentsCount || 0} Learners
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs">
                        <Eye className="w-3.5 h-3.5 text-sky-600" />
                        <span>{visitorCount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Course Visitors</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ₹{course.samplePrice.toLocaleString("en-IN")}*
                    </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/courses/${course.id}/curriculum`}
                        className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Manage Modules & Lectures"
                      >
                        <Layers className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/courses/${course.id}/edit`}
                        className="p-1.5 text-stone-600 hover:bg-stone-100 rounded-md transition-colors"
                        title="Edit Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
                        title="Preview on Public Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id, course.title)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
