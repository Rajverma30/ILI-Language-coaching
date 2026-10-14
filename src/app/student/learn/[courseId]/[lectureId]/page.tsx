"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  HelpCircle,
  Download,
  Info,
  Volume2,
  Maximize2,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

export default function RecordedLessonPlayerPage({
  params,
}: {
  params: Promise<{ courseId: string; lectureId: string }>;
}) {
  const { courseId, lectureId } = use(params);
  const router = useRouter();

  const {
    getCourseById,
    currentStudent,
    markLectureCompleted,
    getStudentCourseProgress,
  } = useDemo();

  const course = getCourseById(courseId);

  // Player controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");
  const [activeTab, setActiveTab] = useState<"notes" | "quiz" | "resources">("notes");
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Find active section & lecture
  const allLectures = useMemo(() => {
    if (!course) return [];
    return (course.sections || []).flatMap((sec) => sec.lectures || []);
  }, [course]);

  const currentLectureIndex = allLectures.findIndex((l) => l.id === lectureId);
  const currentLecture = allLectures[currentLectureIndex] || allLectures[0];

  const prevLecture = currentLectureIndex > 0 ? allLectures[currentLectureIndex - 1] : null;
  const nextLecture =
    currentLectureIndex < allLectures.length - 1 ? allLectures[currentLectureIndex + 1] : null;

  if (!course || !currentLecture) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-editorial text-2xl font-bold text-[#0F1D38] mb-2">Lesson Not Found</h2>
        <p className="text-xs text-[#5C6479] mb-6">The requested lecture module could not be found.</p>
        <Link
          href="/student/courses"
          className="px-4 py-2 rounded-lg bg-[#0F1D38] text-white text-xs font-semibold"
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
    <div className="min-h-screen bg-[#0A1325] text-stone-200 flex flex-col">
      {/* Top Learning Navigation Header */}
      <header className="bg-[#0F1D38] border-b border-[#1E3156] px-4 py-3 sticky top-0 z-40">
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
            <div className="hidden md:flex items-center gap-2 text-xs text-stone-300">
              <span>{progress.completedCount} / {progress.totalLectures} Complete</span>
              <div className="w-20 bg-stone-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E0C17E] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <span className="font-bold text-[#E0C17E]">{progress.percentage}%</span>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isLectureCompleted
                  ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30"
                  : "bg-[#801D30] text-white hover:bg-[#9B283E]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isLectureCompleted ? "Completed" : "Mark Complete"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Video + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left / Center Video Stage & Tabs */}
        <div className="flex-1 flex flex-col bg-[#060D1A] overflow-y-auto">
          {/* Video Player Display Container */}
          <div className="relative aspect-video w-full max-h-[68vh] bg-black flex flex-col items-center justify-center overflow-hidden border-b border-[#1E3156]">
            {currentLecture.videoUrl ? (
              <video
                src={currentLecture.videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              /* Simulated High-Fidelity Demo Video Player */
              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center select-none group">
                {/* Background ambient poster image */}
                <img
                  src={course.coverImage}
                  alt={currentLecture.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/40" />

                {/* Center Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative z-10 w-20 h-20 rounded-full bg-[#801D30]/90 text-white hover:bg-[#9B283E] hover:scale-105 transition-all flex items-center justify-center shadow-2xl cursor-pointer group-hover:scale-110"
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-[#E0C17E]" />
                  ) : (
                    <Play className="w-8 h-8 text-[#E0C17E] ml-1" />
                  )}
                </button>

                {/* Lesson Title & Info in Player */}
                <div className="relative z-10 mt-5 space-y-1 max-w-lg px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0F1D38]/80 text-[#E0C17E] border border-white/10">
                    Recorded Audio-Visual Lesson &bull; {currentLecture.duration}
                  </span>
                  <h2 className="font-editorial text-lg sm:text-2xl font-bold text-white leading-tight">
                    {currentLecture.title}
                  </h2>
                  <p className="text-xs text-stone-300 line-clamp-2">
                    {currentLecture.summary || "Goethe & CEFR Aligned Language Lesson"}
                  </p>
                </div>

                {/* Bottom Custom Playback Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2">
                  {/* Scrubber timeline */}
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="bg-[#E0C17E] h-full rounded-full transition-all duration-300"
                      style={{ width: isPlaying ? "42%" : "15%" }}
                    />
                  </div>

                  {/* Player bottom row controls */}
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-white cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <Volume2 className="w-4 h-4 text-stone-400" />
                      <span className="font-mono text-[11px]">
                        {isPlaying ? "10:14" : "03:45"} / {currentLecture.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Speed selector */}
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">
                        {(["1x", "1.25x", "1.5x"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setPlaybackSpeed(s)}
                            className={`px-1 rounded ${
                              playbackSpeed === s ? "text-[#E0C17E] font-bold" : "text-stone-400"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      <Maximize2 className="w-4 h-4 text-stone-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Under-player Navigation Toolbar */}
          <div className="bg-[#0A1325] border-b border-[#1E3156] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                disabled={!prevLecture}
                onClick={() => prevLecture && router.push(`/student/learn/${course.id}/${prevLecture.id}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F1D38] border border-[#1E3156] hover:bg-[#1A2E56] disabled:opacity-40 disabled:cursor-not-allowed text-stone-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                disabled={!nextLecture}
                onClick={() => nextLecture && router.push(`/student/learn/${course.id}/${nextLecture.id}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F1D38] border border-[#1E3156] hover:bg-[#1A2E56] disabled:opacity-40 disabled:cursor-not-allowed text-stone-300 transition-colors"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bunny Stream notice */}
            <div className="inline-flex items-center gap-1.5 text-[11px] text-stone-400">
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span>Bunny Stream video delivery boundary prepared for tokenized HLS streaming.</span>
            </div>
          </div>

          {/* Lesson Study Tabs */}
          <div className="p-4 sm:p-6 space-y-6 flex-1 bg-[#091224]">
            {/* Tab switch buttons */}
            <div className="flex items-center gap-2 border-b border-[#1E3156] pb-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-[#801D30] text-white"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lecture Notes & Grammar</span>
              </button>

              {currentLecture.quiz && (
                <button
                  onClick={() => setActiveTab("quiz")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === "quiz"
                      ? "bg-[#801D30] text-white"
                      : "text-stone-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Practice Retention Quiz</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab("resources")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "resources"
                    ? "bg-[#801D30] text-white"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Worksheet Downloads</span>
              </button>
            </div>

            {/* Tab Content: Notes */}
            {activeTab === "notes" && (
              <div className="space-y-4 max-w-3xl">
                <div className="bg-[#0F1D38] rounded-xl border border-[#1E3156] p-5 space-y-3">
                  <h3 className="font-editorial text-lg font-bold text-white">
                    Instructor Key Notes & Takeaways
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-300 whitespace-pre-line leading-relaxed font-mono bg-black/30 p-4 rounded-lg border border-white/5">
                    {currentLecture.notes ||
                      "No specific notes attached to this lesson yet. Review the main video recording and practice pronunciation aloud."}
                  </div>
                </div>

                {currentLecture.summary && (
                  <div className="bg-[#0F1D38] rounded-xl border border-[#1E3156] p-5 space-y-2">
                    <h4 className="font-editorial text-base font-bold text-white">
                      Lesson Core Objectives
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {currentLecture.summary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab Content: Quiz */}
            {activeTab === "quiz" && currentLecture.quiz && (
              <div className="max-w-2xl bg-[#0F1D38] rounded-xl border border-[#1E3156] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#1E3156] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E0C17E]">
                    Interactive Check
                  </span>
                  <span className="text-xs text-stone-400">1 Question</span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-white">
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
                      optionStyle = "bg-[#801D30]/40 border-[#801D30] text-white font-semibold";
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
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#801D30] text-white hover:bg-[#9B283E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    Check My Answer
                  </button>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div
                      className={`p-3 rounded-lg text-xs leading-relaxed ${
                        selectedQuizAnswer === currentLecture.quiz.correctIndex
                          ? "bg-emerald-900/30 border border-emerald-700/50 text-emerald-200"
                          : "bg-red-900/30 border border-red-700/50 text-red-200"
                      }`}
                    >
                      <strong className="block mb-1">
                        {selectedQuizAnswer === currentLecture.quiz.correctIndex
                          ? "Correct! Well done!"
                          : "Not quite correct:"}
                      </strong>
                      <p>{currentLecture.quiz.explanation}</p>
                    </div>

                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedQuizAnswer(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Question</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab Content: Resources */}
            {activeTab === "resources" && (
              <div className="max-w-2xl bg-[#0F1D38] rounded-xl border border-[#1E3156] p-6 space-y-4">
                <h3 className="font-editorial text-lg font-bold text-white">
                  Supplementary Study Material
                </h3>
                <p className="text-xs text-stone-400">
                  Download printable cheatsheets and vocabulary lists aligned with this lesson.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Module Vocabulary & Formula Cheatsheet (PDF)
                      </h4>
                      <p className="text-[11px] text-stone-400">German/English phonetic tables &bull; 1.4 MB</p>
                    </div>
                    <button
                      onClick={() => alert("Demo Mode: In production, this downloads the authenticated PDF from the institute asset storage.")}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E0C17E] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        Official Exam Mock Audio Transcript (PDF)
                      </h4>
                      <p className="text-[11px] text-stone-400">Goethe-Zertifikat pattern Hören dialogues &bull; 850 KB</p>
                    </div>
                    <button
                      onClick={() => alert("Demo Mode: In production, this downloads the official exam practice transcript.")}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E0C17E] flex items-center gap-1.5 cursor-pointer"
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

        {/* Right Curriculum Navigation Sidebar */}
        <aside className="w-full lg:w-96 bg-[#0F1D38] border-t lg:border-t-0 lg:border-l border-[#1E3156] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#1E3156] bg-[#0A1325]">
            <h3 className="font-editorial text-base font-bold text-white">
              Course Curriculum
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {progress.completedCount} of {progress.totalLectures} lessons completed ({progress.percentage}%)
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1E3156] max-h-[80vh]">
            {course.sections.map((section, secIdx) => (
              <div key={section.id} className="p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0C17E] block mb-1">
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
                            ? "bg-[#801D30] text-white font-semibold shadow-xs"
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

                        <div className="flex-1">
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
      </div>
    </div>
  );
}
