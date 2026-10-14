"use client";

import React, { useState, useMemo } from "react";
import { useDemo } from "@/context/DemoContext";
import { Student } from "@/types";
import { Search, X } from "lucide-react";

export default function AdminStudentsPage() {
  const { students, courses } = useDemo();

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      return (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search)
      );
    });
  }, [students, search]);

  const getCourseTitle = (id: string) => {
    return courses.find((c) => c.id === id)?.title || id;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Student Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enrolled student profiles across Indore classroom and online batches.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
          Total Registered: <strong className="text-sky-700">{students.length}</strong> Students
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Enrolled Language Programs</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-sky-50/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {std.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{std.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{std.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {std.phone}
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {std.enrolledCourseIds.map((cid) => (
                        <span
                          key={cid}
                          className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100 truncate max-w-[180px]"
                        >
                          {getCourseTitle(cid)}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {std.joinedDate}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      {std.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(std)}
                      className="font-bold text-sky-600 hover:underline cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-200 pb-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xl uppercase shadow-xs">
                {selectedStudent.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedStudent.email}</p>
                <p className="text-xs font-mono text-slate-500">{selectedStudent.phone}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-1">
                  Enrolled Courses & Progress
                </span>
                <div className="space-y-2">
                  {selectedStudent.enrolledCourseIds.map((cid) => {
                    const prog = selectedStudent.progress[cid] || { completedLectureIds: [] };
                    return (
                      <div key={cid} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <strong className="text-slate-900 block">{getCourseTitle(cid)}</strong>
                        <div className="flex justify-between text-slate-500 text-[11px]">
                          <span>Completed Lessons: {prog.completedLectureIds.length}</span>
                          {prog.lastAccessedAt && (
                            <span>Last active: {new Date(prog.lastAccessedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 italic">
                * Student record maintained in local demo store. In production, this maps to MongoDB collection &lsquo;students&rsquo;.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 shadow-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
