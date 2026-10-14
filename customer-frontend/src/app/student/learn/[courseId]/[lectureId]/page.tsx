"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { BunnyPlayer } from "@/components/player/BunnyPlayer";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  HelpCircle,
  Download,
  ArrowLeft,
  RotateCcw,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  X,
} from "lucide-react";

export default function StudentLearningPage({
  params,
}: {
  params: Promise<{ courseId: string; lectureId: string }>;
}) {
  const { courseId, lectureId } = use(params);
  const router = useRouter();

  const {
    getCourseById,
    currentStudent,
    isLoadingAuth,
    markLectureCompleted,
    getStudentCourseProgress,
  } = useDemo();

  const course = getCourseById(courseId);

  // UI state
  const [activeTab, setActiveTab] = useState<"notes" | "quiz" | "resources">("notes");
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Flattened lectures for sequential navigation
  const allLectures = useMemo(() => {
    if (!course) return [];
    return (course.sections || []).flatMap((sec) => sec.lectures || []);
  }, [course]);

  const currentLectureIndex = allLectures.findIndex((l) => l.id === lectureId);
  const currentLecture = allLectures[currentLectureIndex] || allLectures[0];

  const prevLecture = currentLectureIndex > 0 ? allLectures[currentLectureIndex - 1] : null;
  const nextLecture =
    currentLectureIndex < allLectures.length - 1 ? allLectures[currentLectureIndex + 1] : null;

  if (isLoadingAuth && !course) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center font-sans text-white">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-300">Loading lesson and stream...</p>
      </div>
    );
  }

  if (!course || !currentLecture) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center font-sans">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lesson Not Found</h2>
        <p className="text-xs text-slate-600 mb-6">The requested lecture module could not be found.</p>
        <Link
          href="/student/courses"
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          &larr; Back to My Courses
        </Link>
      </div>
    );
  }

  const progress = getStudentCourseProgress(currentStudent?.id || "std-raj-1", course.id);
  const isLectureCompleted = progress.isCompleted(currentLecture.id);

  const handleToggleComplete = () => {
    markLectureCompleted(course.id, currentLecture.id);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Courses</span>
            </Link>

            <div className="border-l border-stone-700 pl-3">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                {course.title}
              </h1>
              <p className="text-[11px] text-stone-400 truncate max-w-xs sm:max-w-md">
                {currentLecture.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live progress percentage */}
            <div className="hidden md:flex items-center gap-2 text-xs text-stone-300">
              <span>{progress.completedCount} / {progress.totalLectures} Completed</span>
              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <span className="font-bold text-sky-400">{progress.percentage}%</span>
            </div>

            {/* Mark complete toggle */}
            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isLectureCompleted
                  ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30"
                  : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isLectureCompleted ? "Completed" : "Mark as completed"}</span>
            </button>

            {/* Desktop sidebar toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:inline-flex items-center p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={sidebarOpen ? "Hide Curriculum" : "Show Curriculum"}
              aria-label="Toggle Curriculum Sidebar"
            >
              {sidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>

            {/* Mobile drawer toggle */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white"
              aria-label="Open Curriculum Drawer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace: Focus Video Stage + Collapsible Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Video & Lesson Content Column */}
        <main className="flex-1 overflow-y-auto flex flex-col bg-[#060D1A]">
          {/* Responsive 16:9 Official Video Player Container */}
          <div className="w-full bg-black p-2 sm:p-4 flex items-center justify-center border-b border-[#1E3156]">
            <div className="w-full max-w-5xl">
              <BunnyPlayer
                videoId={currentLecture.bunnyVideoId}
                videoUrl={currentLecture.videoUrl}
                lessonTitle={currentLecture.title}
                courseTitle={course.title}
                duration={currentLecture.duration}
              />
            </div>
          </div>

          {/* Under-player Navigation Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  disabled={!prevLecture}
                  onClick={() => prevLecture && router.push(`/student/learn/${course.id}/${prevLecture.id}`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Lesson</span>
                </button>

                <button
                  disabled={!nextLecture}
                  onClick={() => nextLecture && router.push(`/student/learn/${course.id}/${nextLecture.id}`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                <span className="font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Lesson {currentLectureIndex + 1} of {allLectures.length}
                </span>
                <span>&bull;</span>
                <span>{currentLecture.duration}</span>
              </div>
            </div>
          </div>

          {/* Lesson Title & Objectives (Below Player) */}
          <div className="bg-[#08101F] px-4 py-5 border-b border-[#1E3156]">
            <div className="max-w-5xl mx-auto space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-600 text-white">
                  {course.language} &bull; {course.level}
                </span>
                {isLectureCompleted && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                {currentLecture.title}
              </h2>
              {currentLecture.summary && (
                <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                  {currentLecture.summary}
                </p>
              )}
            </div>
          </div>

          {/* Accessible Study Tabs Section: Notes, Quiz, Worksheets */}
          <div className="flex-1 bg-[#060D1A] px-4 py-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Tab Navigation Controls */}
              <div className="flex items-center gap-2 border-b border-[#1E3156] pb-3 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "notes"
                      ? "bg-sky-600 text-white"
                      : "text-stone-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Notes & Grammar</span>
                </button>

                {currentLecture.quiz && (
                  <button
                    onClick={() => setActiveTab("quiz")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "quiz"
                        ? "bg-sky-600 text-white"
                        : "text-stone-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Practice Quiz</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("resources")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "resources"
                      ? "bg-sky-600 text-white"
                      : "text-stone-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Worksheets & Lab</span>
                </button>
              </div>

              {/* Tab 1: Lecture Notes */}
              {activeTab === "notes" && (
                <div className="space-y-4 max-w-3xl">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white">
                      Instructor Key Notes & Grammar Rules
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-mono bg-black/40 p-4 rounded-xl border border-white/5">
                      {currentLecture.notes ||
                        "Review the recorded phonetic guide and practice pronunciation aloud. Make sure to complete the retention quiz in the next tab."}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Retention Quiz */}
              {activeTab === "quiz" && currentLecture.quiz && (
                <div className="max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                      Comprehension Check
                    </span>
                    <span className="text-xs text-slate-400">1 Practice Question</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {currentLecture.quiz.question}
                  </h3>

                  <div className="space-y-2.5">
                    {currentLecture.quiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = idx === currentLecture.quiz?.correctIndex;
                      let optionStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-stone-200";

                      if (quizSubmitted) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold";
                        } else if (isSelected && !isCorrect) {
                          optionStyle = "bg-red-950/60 border-red-500 text-red-200";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-sky-900/60 border-sky-500 text-white font-semibold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => !quizSubmitted && setSelectedQuizAnswer(idx)}
                          className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={selectedQuizAnswer === null}
                      onClick={handleQuizSubmit}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div
                        className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                          selectedQuizAnswer === currentLecture.quiz.correctIndex
                            ? "bg-emerald-900/30 border border-emerald-700/50 text-emerald-200"
                            : "bg-red-900/30 border border-red-700/50 text-red-200"
                        }`}
                      >
                        <strong className="block mb-1 font-semibold">
                          {selectedQuizAnswer === currentLecture.quiz.correctIndex
                            ? "Correct answer!"
                            : "Incorrect answer:"}
                        </strong>
                        <p>{currentLecture.quiz.explanation}</p>
                      </div>

                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedQuizAnswer(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Question</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Worksheet Downloads */}
              {activeTab === "resources" && (
                <div className="max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white">
                    Curriculum Worksheets & Exercises
                  </h3>
                  <p className="text-xs text-slate-400">
                    Download printable vocabulary lists and grammar exercise sheets for this module.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Module Vocabulary & Sentence Formulation (PDF)
                        </h4>
                        <p className="text-[11px] text-slate-400">Printable A4 worksheet &bull; 1.2 MB</p>
                      </div>
                      <button
                        onClick={() => alert("Downloading student curriculum worksheet...")}
                        className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Certification Mock Audio Dialogue Transcript (PDF)
                        </h4>
                        <p className="text-[11px] text-slate-400">Exam preparation dialogue text &bull; 820 KB</p>
                      </div>
                      <button
                        onClick={() => alert("Downloading exam mock dialogue transcript...")}
                        className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Collapsible Curriculum Sidebar (Desktop) */}
        {sidebarOpen && (
          <aside className="hidden lg:flex flex-col w-88 xl:w-96 bg-slate-900 border-l border-slate-800 shrink-0">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Course Curriculum
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {progress.completedCount} of {progress.totalLectures} lessons completed ({progress.percentage}%)
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                title="Collapse sidebar"
              >
                <PanelRightClose className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
              {course.sections.map((section, secIdx) => (
                <div key={section.id} className="p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                    Section {secIdx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white mb-2 leading-tight">
                    {section.title}
                  </h4>

                  <div className="space-y-1">
                    {section.lectures.map((lec) => {
                      const isCurrent = lec.id === currentLecture.id;
                      const isDone = progress.isCompleted(lec.id);

                      return (
                        <Link
                          key={lec.id}
                          href={`/student/learn/${course.id}/${lec.id}`}
                          className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-start gap-2.5 ${
                            isCurrent
                              ? "bg-sky-600 text-white font-semibold shadow-xs"
                              : "hover:bg-white/5 text-stone-300"
                          }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-stone-500" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="line-clamp-2 leading-tight">{lec.title}</p>
                            <span className="text-[10px] text-stone-400 font-mono block mt-1">
                              {lec.duration}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Curriculum Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-2xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-xs bg-slate-900 text-slate-200 flex flex-col p-4 shadow-2xl z-10 ml-auto border-l border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
              <span className="text-base font-bold text-white">
                Curriculum
              </span>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {course.sections.map((section, secIdx) => (
                <div key={section.id} className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold uppercase text-sky-400 block mb-1">
                    Section {secIdx + 1}: {section.title}
                  </span>
                  <div className="space-y-1">
                    {section.lectures.map((lec) => {
                      const isCurrent = lec.id === currentLecture.id;
                      const isDone = progress.isCompleted(lec.id);

                      return (
                        <Link
                          key={lec.id}
                          href={`/student/learn/${course.id}/${lec.id}`}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`block p-2 rounded text-xs ${
                            isCurrent ? "bg-sky-600 text-white font-semibold" : "text-stone-300 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                            )}
                            <span className="truncate">{lec.title}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
