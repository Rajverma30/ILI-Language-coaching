"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  PlusCircle,
  Trash2,
  PlayCircle,
  FileText,
  HelpCircle,
  X,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { BunnyVideoUploader } from "@/components/ui/BunnyVideoUploader";

export default function CourseCurriculumManagerPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const {
    getCourseById,
    addSection,
    deleteSection,
    addLecture,
    deleteLecture,
  } = useDemo();

  const course = getCourseById(courseId);

  // Modals state
  const [addSectionModalOpen, setAddSectionModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const [addLectureModalOpen, setAddLectureModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [lectureForm, setLectureForm] = useState({
    title: "",
    duration: "25m",
    durationSeconds: 1500,
    bunnyVideoId: "",
    videoUrl: "",
    summary: "",
    notes: "",
    noQuiz: true,
    quizQuestion: "",
    quizOptions: "Option A, Option B, Option C, Option D",
    quizCorrectIndex: 0,
    quizExplanation: "",
  });

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Course Not Found</h2>
        <Link href="/courses" className="text-xs text-sky-600 hover:underline mt-2 block font-semibold">
          &larr; Return to Courses
        </Link>
      </div>
    );
  }

  const handleAddSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    addSection(course.id, newSectionTitle.trim());
    setNewSectionTitle("");
    setAddSectionModalOpen(false);
  };

  const handleOpenAddLecture = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setLectureForm({
      title: "",
      duration: "25m",
      durationSeconds: 1500,
      bunnyVideoId: "",
      videoUrl: "",
      summary: "",
      notes: "",
      noQuiz: true,
      quizQuestion: "",
      quizOptions: "Option A, Option B, Option C, Option D",
      quizCorrectIndex: 0,
      quizExplanation: "",
    });
    setAddLectureModalOpen(true);
  };

  const handleAddLectureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSectionId || !lectureForm.title.trim()) return;

    const quizOptionsArray = lectureForm.quizOptions
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const libraryId = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID;
    let finalVideoUrl = lectureForm.videoUrl.trim();
    if (lectureForm.bunnyVideoId.trim() && libraryId) {
      finalVideoUrl = `https://player.mediadelivery.net/embed/${libraryId}/${lectureForm.bunnyVideoId.trim()}?autoplay=false&preload=true`;
    }

    addLecture(course.id, activeSectionId, {
      title: lectureForm.title.trim(),
      duration: lectureForm.duration.trim(),
      durationSeconds: Number(lectureForm.durationSeconds),
      videoUrl: finalVideoUrl || undefined,
      bunnyVideoId: lectureForm.bunnyVideoId.trim() || undefined,
      summary: lectureForm.summary.trim() || undefined,
      notes: lectureForm.notes.trim() || undefined,
      hasQuiz: !lectureForm.noQuiz,
      quiz:
        !lectureForm.noQuiz && lectureForm.quizQuestion.trim()
          ? {
              question: lectureForm.quizQuestion.trim(),
              options: quizOptionsArray.length > 0 ? quizOptionsArray : ["Option A", "Option B"],
              correctIndex: Number(lectureForm.quizCorrectIndex),
              explanation: lectureForm.quizExplanation.trim() || "Correct answer.",
            }
          : undefined,
      isFreePreview: true,
    });

    setAddLectureModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/courses" },
            { label: course.title, href: `/courses/${course.id}/edit` },
            { label: "Curriculum Organizer" },
          ]}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Manage Curriculum: {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {course.sections.length} Modules &bull; {course.totalLectures} Lessons Total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddSectionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 shadow-xs cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Module</span>
            </button>

            <Link
              href={`/student/learn/${course.id}/${course.sections[0]?.lectures[0]?.id || "preview"}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Test in Player</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sections and Lectures List */}
      <div className="space-y-6">
        {course.sections.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200 space-y-3">
            <Layers className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">
              No Modules Created Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start structuring your language curriculum by adding your first module (e.g., Module 1: Alphabet & Greetings).
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setAddSectionModalOpen(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              Add First Module
            </Button>
          </div>
        ) : (
          course.sections.map((section, idx) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-0"
            >
              {/* Section Header */}
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block">
                    Module {idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {section.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {section.lectures.length} Lessons
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAddLecture(section.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-sky-600" />
                    <span>Add Lesson</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete Module "${section.title}" and its lectures?`)) {
                        deleteSection(course.id, section.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-stone-200 rounded-md cursor-pointer"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lectures List */}
              <div className="divide-y divide-stone-100">
                {section.lectures.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-400">
                    No lessons in this module yet. Click &quot;Add Lesson&quot; above to create one.
                  </div>
                ) : (
                  section.lectures.map((lec, lecIdx) => (
                    <div
                      key={lec.id}
                      className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-sky-50/20 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center shrink-0 text-[11px]">
                          {lecIdx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{lec.title}</span>
                            <span className="font-mono text-slate-400">({lec.duration})</span>
                            {lec.quiz && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800 uppercase">
                                Quiz Attached
                              </span>
                            )}
                          </div>
                          {lec.summary && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {lec.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/student/learn/${course.id}/${lec.id}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 text-[11px] font-medium transition-colors"
                        >
                          Preview Player
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Delete lesson "${lec.title}"?`)) {
                              deleteLecture(course.id, section.id, lec.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-700 rounded cursor-pointer"
                          title="Delete Lesson"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Add Module */}
      {addSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E2D8] relative">
            <button
              onClick={() => setAddSectionModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Add New Module / Section
            </h3>
            <form onSubmit={handleAddSectionSubmit} className="space-y-4">
              <Input
                label="Module Title"
                placeholder="e.g. Module 3: Food, Supermarket & Accusative Case"
                required
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddSectionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
                  Add Module
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Lecture */}
      {addLectureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddLectureModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Add Lecture to Module
            </h3>
            <form onSubmit={handleAddLectureSubmit} className="space-y-4">
              <Input
                label="Lesson Title"
                placeholder="e.g. Lesson 5: Nominative vs Accusative Articles"
                required
                value={lectureForm.title}
                onChange={(e) => setFormKey("title", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Display Duration"
                  placeholder="25m"
                  value={lectureForm.duration}
                  onChange={(e) => setFormKey("duration", e.target.value)}
                />
                <Input
                  label="Duration (Seconds)"
                  type="number"
                  value={lectureForm.durationSeconds}
                  onChange={(e) => setFormKey("durationSeconds", e.target.value)}
                />
              </div>

              {/* Direct Bunny Stream Video Uploader */}
              <BunnyVideoUploader
                videoId={lectureForm.bunnyVideoId}
                lectureTitle={lectureForm.title || "Lesson Video"}
                onVideoUploaded={(guid) => setFormKey("bunnyVideoId", guid)}
              />

              <Input
                label="Direct Video URL (Optional fallback)"
                placeholder="https://... (or leave empty)"
                value={lectureForm.videoUrl}
                onChange={(e) => setFormKey("videoUrl", e.target.value)}
              />

              <Textarea
                label="Lesson Summary"
                rows={2}
                placeholder="Core takeaways and grammatical concepts taught..."
                value={lectureForm.summary}
                onChange={(e) => setFormKey("summary", e.target.value)}
              />

              <Textarea
                label="Instructor Notes (Markdown/Formula)"
                rows={3}
                placeholder="Vocabulary list, verb conjugation formula..."
                value={lectureForm.notes}
                onChange={(e) => setFormKey("notes", e.target.value)}
              />

              <div className="border-t border-slate-200 pt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-sky-600">
                    Practice Q&A / Retention Quiz
                  </h4>
                  {lectureForm.noQuiz && (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Q&A Skipped
                    </span>
                  )}
                </div>

                {/* Tick box for No Q&A */}
                <label className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={lectureForm.noQuiz}
                    onChange={(e) => setFormKey("noQuiz", e.target.checked as any)}
                    className="w-4 h-4 mt-0.5 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      ☑ Is lesson ke liye koi Q&A nahi hai (No Q&A / Skip)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Agar is lesson me quiz question nahi dalna, toh yaha tick karein.
                    </p>
                  </div>
                </label>

                {!lectureForm.noQuiz && (
                  <div className="space-y-3 pt-1">
                    <Input
                      label="Quiz Question"
                      placeholder="e.g. What is the accusative definite article for der?"
                      value={lectureForm.quizQuestion}
                      onChange={(e) => setFormKey("quizQuestion", e.target.value)}
                    />
                    <Input
                      label="Options (comma-separated)"
                      placeholder="der, den, das, die"
                      value={lectureForm.quizOptions}
                      onChange={(e) => setFormKey("quizOptions", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Correct Option Index (0-based)"
                        type="number"
                        value={lectureForm.quizCorrectIndex}
                        onChange={(e) => setFormKey("quizCorrectIndex", e.target.value)}
                      />
                      <Input
                        label="Explanation"
                        placeholder="e.g. 'der' shifts to 'den' in accusative."
                        value={lectureForm.quizExplanation}
                        onChange={(e) => setFormKey("quizExplanation", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddLectureModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" size="sm">
                  Add Lesson to Curriculum
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  function setFormKey(key: string, val: string | number) {
    setLectureForm((prev) => ({ ...prev, [key]: val }));
  }
}
