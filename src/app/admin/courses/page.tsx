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
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
            Course Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6479]">
            Manage language courses, curriculum modules, recorded video links, and tuition fees.
          </p>
        </div>

        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#801D30] text-white hover:bg-[#9B283E] shadow-sm transition-colors self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-[#E8E2D8] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E8E2D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F1D38]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-[#E8E2D8] bg-white focus:outline-hidden"
          >
            <option value="All">All Languages</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
          </select>
          <span className="text-xs text-stone-500 whitespace-nowrap">
            {filteredCourses.length} Courses
          </span>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Course Program</th>
                <th className="py-3 px-4">Language & Level</th>
                <th className="py-3 px-4">Curriculum</th>
                <th className="py-3 px-4">Enrolled</th>
                <th className="py-3 px-4">Sample Tuition</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-12 h-10 rounded-md object-cover bg-stone-200 shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-[#0F1D38] line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-stone-500 truncate max-w-xs">
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

                  <td className="py-3.5 px-4 text-stone-600">
                    <div><strong>{course.sections.length}</strong> Modules</div>
                    <div className="text-[11px] text-stone-400">{course.totalLectures} Lessons &bull; {course.durationHours}h</div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-stone-700">
                    {course.enrolledStudentsCount || 0} Learners
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#0F1D38]">
                    ₹{course.samplePrice.toLocaleString("en-IN")}*
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/courses/${course.id}/curriculum`}
                        className="p-1.5 text-[#801D30] hover:bg-[#FAF0F2] rounded-md transition-colors"
                        title="Manage Modules & Lectures"
                      >
                        <Layers className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
