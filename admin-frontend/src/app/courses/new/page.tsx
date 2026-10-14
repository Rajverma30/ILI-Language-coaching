"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CourseLanguage, CourseLevel, CourseSection } from "@/types";
import { BunnyVideoUploader } from "@/components/ui/BunnyVideoUploader";
import {
  PlusCircle,
  ArrowLeft,
  Sparkles,
  Layers,
  Video,
  HelpCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Info,
} from "lucide-react";

interface NewLecture {
  id: string;
  title: string;
  duration: string;
  bunnyVideoId: string;
  videoUrl: string;
  isFreePreview: boolean;
}

interface NewModule {
  id: string;
  title: string;
  description: string;
  noQuiz: boolean; // Tick box for "No Q&A for this module"
  quiz: {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctIndex: number;
    explanation: string;
  };
  lectures: NewLecture[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const { addCourse } = useDemo();

  // Basic Course Details
  const [form, setForm] = useState({
    title: "",
    slug: "",
    language: "German" as CourseLanguage,
    level: "A1" as CourseLevel,
    shortDescription: "",
    fullDescription: "",
    durationHours: 60,
    samplePrice: 12000,
    originalPrice: 15000,
    coverImage: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=800&q=80",
    instructorName: "Frau Ananya Saxena (ILI Faculty)",
    instructorTitle: "Senior Goethe-Certified Trainer",
    instructorBio: "Experienced language coach certified by international examining bodies.",
    highlights: "Phonetic drills, CEFR standard syllabus, Goethe mock papers, Recorded review",
    prerequisites: "Open to beginners. No previous experience needed.",
    certificateInfo: "ILI Certificate of Language Proficiency & Mock Test Report.",
    bunnyLibraryId: process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID || "",
  });

  // Modules (Sections) with Q&A & Bunny Video Lectures
  const [modules, setModules] = useState<NewModule[]>([
    {
      id: "mod-1",
      title: "Module 1: Introduction, Alphabet & Phonetics",
      description: "Foundational German phonetics, greetings, and alphabet pronunciation.",
      noQuiz: false,
      quiz: {
        question: "What is the polite German greeting used during daytime?",
        optionA: "Guten Tag",
        optionB: "Auf Wiedersehen",
        optionC: "Tschüss",
        optionD: "Danke",
        correctIndex: 0,
        explanation: "'Guten Tag' means 'Good Day' and is the standard formal daytime greeting.",
      },
      lectures: [
        {
          id: "lec-1-1",
          title: "Lesson 1.1: Alphabet Pronunciation & Umlauts",
          duration: "25m",
          bunnyVideoId: "",
          videoUrl: "",
          isFreePreview: true,
        },
      ],
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBunnyGuide, setShowBunnyGuide] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === generatedSlug.slice(0, -1) ? generatedSlug : prev.slug,
    }));
  };

  // Add new module
  const handleAddModule = () => {
    const newModNumber = modules.length + 1;
    setModules((prev) => [
      ...prev,
      {
        id: `mod-${Date.now()}`,
        title: `Module ${newModNumber}: New Curriculum Topic`,
        description: "",
        noQuiz: false,
        quiz: {
          question: "",
          optionA: "Option A",
          optionB: "Option B",
          optionC: "Option C",
          optionD: "Option D",
          correctIndex: 0,
          explanation: "",
        },
        lectures: [
          {
            id: `lec-${Date.now()}-1`,
            title: `Lesson ${newModNumber}.1: Topic Overview`,
            duration: "20m",
            bunnyVideoId: "",
            videoUrl: "",
            isFreePreview: false,
          },
        ],
      },
    ]);
  };

  // Remove module
  const handleRemoveModule = (index: number) => {
    if (modules.length <= 1) {
      alert("A course must have at least one module.");
      return;
    }
    setModules((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle "No Q&A" for a module
  const handleToggleNoQuiz = (moduleIndex: number, checked: boolean) => {
    setModules((prev) =>
      prev.map((mod, i) => (i === moduleIndex ? { ...mod, noQuiz: checked } : mod))
    );
  };

  // Add lecture to a module
  const handleAddLecture = (moduleIndex: number) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIndex) return mod;
        const newLecNum = mod.lectures.length + 1;
        return {
          ...mod,
          lectures: [
            ...mod.lectures,
            {
              id: `lec-${Date.now()}-${newLecNum}`,
              title: `Lesson ${i + 1}.${newLecNum}: Concept Practice`,
              duration: "25m",
              bunnyVideoId: "",
              videoUrl: "",
              isFreePreview: false,
            },
          ],
        };
      })
    );
  };

  // Remove lecture from a module
  const handleRemoveLecture = (moduleIndex: number, lectureIndex: number) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIndex) return mod;
        if (mod.lectures.length <= 1) {
          alert("Each module must have at least one lecture.");
          return mod;
        }
        return {
          ...mod,
          lectures: mod.lectures.filter((_, li) => li !== lectureIndex),
        };
      })
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Course title is required";
    if (!form.slug.trim()) errs.slug = "URL slug is required";
    if (!form.shortDescription.trim()) errs.shortDescription = "Short description is required";
    if (form.samplePrice <= 0) errs.samplePrice = "Price must be greater than zero";

    // Validate modules
    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      if (!m.title.trim()) {
        errs[`mod_${i}`] = `Module ${i + 1} title is required`;
      }
      if (!m.noQuiz && m.quiz.question.trim() === "") {
        errs[`quiz_${i}`] = `Module ${i + 1} has Q&A enabled. Please enter a question or tick 'No Q&A'`;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Build standard CourseSection[] format
    const formattedSections: CourseSection[] = modules.map((mod, modIdx) => ({
      id: mod.id || `sec-${Date.now()}-${modIdx}`,
      title: mod.title.trim(),
      description: mod.description.trim() || undefined,
      order: modIdx + 1,
      hasQuiz: !mod.noQuiz,
      quiz: mod.noQuiz
        ? undefined
        : {
            question: mod.quiz.question.trim(),
            options: [mod.quiz.optionA, mod.quiz.optionB, mod.quiz.optionC, mod.quiz.optionD].filter(
              Boolean
            ),
            correctIndex: Number(mod.quiz.correctIndex),
            explanation: mod.quiz.explanation.trim() || "Correct answer.",
          },
      lectures: mod.lectures.map((lec, lecIdx) => {
        // Construct Bunny direct embed URL if bunnyVideoId is supplied
        const effectiveLibId = form.bunnyLibraryId || process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID;
        let finalVideoUrl = lec.videoUrl.trim();
        if (lec.bunnyVideoId.trim() && effectiveLibId) {
          finalVideoUrl = `https://player.mediadelivery.net/embed/${effectiveLibId}/${lec.bunnyVideoId.trim()}?autoplay=false&preload=true`;
        }

        return {
          id: lec.id || `lec-${Date.now()}-${lecIdx}`,
          title: lec.title.trim(),
          duration: lec.duration.trim() || "25m",
          durationSeconds: 1500,
          videoUrl: finalVideoUrl || undefined,
          bunnyVideoId: lec.bunnyVideoId.trim() || undefined,
          bunnyLibraryId: effectiveLibId || undefined,
          order: lecIdx + 1,
          isFreePreview: lec.isFreePreview,
        };
      }),
    }));

    const newCourse = addCourse({
      title: form.title.trim(),
      slug: form.slug.trim(),
      language: form.language,
      level: form.level,
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      durationHours: Number(form.durationHours),
      samplePrice: Number(form.samplePrice),
      originalPrice: Number(form.originalPrice),
      coverImage: form.coverImage.trim(),
      instructorName: form.instructorName.trim(),
      instructorTitle: form.instructorTitle.trim(),
      instructorBio: form.instructorBio.trim(),
      highlights: form.highlights.split(",").map((s) => s.trim()).filter(Boolean),
      prerequisites: form.prerequisites.trim(),
      certificateInfo: form.certificateInfo.trim(),
      status: "Active",
      featured: false,
      sections: formattedSections,
    });

    setIsSubmitting(false);
    // Redirect to courses catalogue without /admin/ prefix (avoids 404)
    router.push("/courses");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Breadcrumbs & Header */}
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/courses" },
            { label: "Create Course & Curriculum" },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Create Course & Curriculum
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Set up course details, modules, recorded Bunny Stream video lessons, and module Q&As all in one place.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowBunnyGuide(!showBunnyGuide)}
            leftIcon={<HelpCircle className="w-4 h-4 text-sky-600" />}
          >
            {showBunnyGuide ? "Hide Bunny Guide" : "Bunny Stream Guide"}
          </Button>
        </div>
      </div>

      {/* Helpful Bunny Stream Integration Guide Box */}
      {showBunnyGuide && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200 text-xs text-slate-800">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Video className="w-5 h-5 text-sky-600" />
            <span>Bunny Stream Integration &mdash; Kya kya lana hai aur kaise lagana hai:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-sky-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[11px] font-bold">1</span>
                Bunny Dashboard se kya lana hai:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li><strong>Video Library ID:</strong> Bunny.net &rarr; Stream &rarr; Library open karne par top par dikhta hai (e.g. <code>123456</code>).</li>
                <li><strong>Video ID (GUID):</strong> Video upload hone ke baad us video par click karein, waha unique <code>Video ID</code> hoti hai (e.g. <code>8d2f5a6b-3c4d...</code>).</li>
                <li><strong>API Key (Optional):</strong> Library Settings &rarr; API tab me milti hai (backend uploads ke liye).</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-sky-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[11px] font-bold">2</span>
                Course Form me kaise paste karein:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li>Niche <strong>Bunny Stream Library ID</strong> field me apni Library ID dalein.</li>
                <li>Har lesson ke samne bas Bunny ka <strong>Video ID</strong> (jaise <code>8d2f5a6b-xxxx</code>) paste kar dein.</li>
                <li>Platform automatically <code>https://player.mediadelivery.net/embed/&#123;libraryId&#125;/&#123;videoId&#125;</code> se video stream karega!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Course Metadata */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">1</span>
              <span>Course Details & Pricing</span>
            </h2>
            <span className="text-xs text-slate-400">Step 1 of 2</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Course Title"
              placeholder="e.g. German A1: Goethe Complete Blueprint"
              required
              value={form.title}
              onChange={handleTitleChange}
              error={errors.title}
            />

            <Input
              label="URL Slug"
              placeholder="e.g. german-a1-goethe"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              error={errors.slug}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Select
              label="Language"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value as CourseLanguage })}
            >
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <option value="English">English</option>
              <option value="Japanese">Japanese</option>
            </Select>

            <Select
              label="CEFR Level"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as CourseLevel })}
            >
              <option value="A1">A1 (Beginner)</option>
              <option value="A2">A2 (Elementary)</option>
              <option value="B1">B1 (Intermediate)</option>
              <option value="B2">B2 (Vantage)</option>
              <option value="Advanced">Advanced (C1/C2)</option>
              <option value="IELTS">IELTS Prep</option>
              <option value="JLPT N5">JLPT N5</option>
            </Select>

            <Input
              label="Duration (Hours)"
              type="number"
              value={form.durationHours}
              onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })}
            />

            <Input
              label="Tuition Fee (₹)"
              type="number"
              required
              value={form.samplePrice}
              onChange={(e) => setForm({ ...form, samplePrice: Number(e.target.value) })}
              error={errors.samplePrice}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Original Fee / Strike-through (₹)"
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
            />

            <Input
              label="Bunny Stream Library ID (Optional Override)"
              placeholder="e.g. 123456 (Leave blank to use .env default)"
              value={form.bunnyLibraryId}
              onChange={(e) => setForm({ ...form, bunnyLibraryId: e.target.value })}
            />
          </div>

          <Textarea
            label="Short Summary (shown on course cards)"
            placeholder="e.g. Intensive 80-hour German A1 classroom & live batch covering Goethe exam blueprint."
            rows={2}
            required
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            error={errors.shortDescription}
          />

          <Textarea
            label="Full Course Overview & Objectives"
            placeholder="Detailed description of syllabus, audio lab sessions, mock test papers, etc."
            rows={4}
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Instructor Name"
              value={form.instructorName}
              onChange={(e) => setForm({ ...form, instructorName: e.target.value })}
            />

            <Input
              label="Instructor Title / Certification"
              value={form.instructorTitle}
              onChange={(e) => setForm({ ...form, instructorTitle: e.target.value })}
            />
          </div>
        </div>

        {/* Step 2: Modules, Lessons (Bunny Stream) & Q&A Builder */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">2</span>
                <span>Curriculum Modules, Lessons & Q&A</span>
              </h2>
              <p className="text-xs text-slate-500">
                Define modules for this course. Attach Bunny Stream videos and add Q&A practice, or tick the box if there is no Q&A.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddModule}
              leftIcon={<PlusCircle className="w-4 h-4 text-sky-600" />}
            >
              + Add Another Module
            </Button>
          </div>

          {/* List of Modules */}
          <div className="space-y-6">
            {modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5"
              >
                {/* Module Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                      {modIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      Module {modIdx + 1}
                    </h3>
                  </div>

                  {modules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveModule(modIdx)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Module</span>
                    </button>
                  )}
                </div>

                {/* Module Title & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Module Title"
                    placeholder="e.g. Module 1: Alphabet & Greetings"
                    required
                    value={mod.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setModules((prev) =>
                        prev.map((m, i) => (i === modIdx ? { ...m, title: val } : m))
                      );
                    }}
                    error={errors[`mod_${modIdx}`]}
                  />

                  <Input
                    label="Module Summary (Optional)"
                    placeholder="Brief description of this module"
                    value={mod.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setModules((prev) =>
                        prev.map((m, i) => (i === modIdx ? { ...m, description: val } : m))
                      );
                    }}
                  />
                </div>

                {/* Lessons inside this Module */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-sky-600" />
                      <span>Video Lessons & Bunny Stream Playback</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddLecture(modIdx)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                    >
                      + Add Lesson
                    </button>
                  </div>

                  <div className="space-y-3">
                    {mod.lectures.map((lec, lecIdx) => (
                      <div
                        key={lec.id}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">
                            Lesson {modIdx + 1}.{lecIdx + 1}
                          </span>
                          {mod.lectures.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLecture(modIdx, lecIdx)}
                              className="text-[11px] text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              Delete Lesson
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Lesson Title (e.g. Alphabet Pronunciation)"
                            value={lec.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setModules((prev) =>
                                prev.map((m, mi) =>
                                  mi === modIdx
                                    ? {
                                        ...m,
                                        lectures: m.lectures.map((l, li) =>
                                          li === lecIdx ? { ...l, title: val } : l
                                        ),
                                      }
                                    : m
                                )
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                          />

                          <input
                            type="text"
                            placeholder="Duration (e.g. 25m)"
                            value={lec.duration}
                            onChange={(e) => {
                              const val = e.target.value;
                              setModules((prev) =>
                                prev.map((m, mi) =>
                                  mi === modIdx
                                    ? {
                                        ...m,
                                        lectures: m.lectures.map((l, li) =>
                                          li === lecIdx ? { ...l, duration: val } : l
                                        ),
                                      }
                                    : m
                                )
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                          />
                        </div>

                        {/* Direct Video Uploader to Bunny Stream */}
                        <BunnyVideoUploader
                          videoId={lec.bunnyVideoId}
                          lectureTitle={lec.title || `Module ${modIdx + 1} - Lesson ${lecIdx + 1}`}
                          onVideoUploaded={(guid) => {
                            setModules((prev) =>
                              prev.map((m, mi) =>
                                mi === modIdx
                                  ? {
                                      ...m,
                                      lectures: m.lectures.map((l, li) =>
                                        li === lecIdx ? { ...l, bunnyVideoId: guid } : l
                                      ),
                                    }
                                  : m
                              )
                            );
                          }}
                        />

                        <label className="inline-flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={lec.isFreePreview}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setModules((prev) =>
                                prev.map((m, mi) =>
                                  mi === modIdx
                                    ? {
                                        ...m,
                                        lectures: m.lectures.map((l, li) =>
                                          li === lecIdx ? { ...l, isFreePreview: checked } : l
                                        ),
                                      }
                                    : m
                                )
                              );
                            }}
                            className="w-3.5 h-3.5 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                          />
                          <span className="text-[11px] text-slate-600">
                            Allow Free Preview without enrollment
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module Q&A Section with "No Q&A" Tick Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span>Module Practice Q&A / Quiz</span>
                    </span>

                    {mod.noQuiz && (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        Q&A Skipped
                      </span>
                    )}
                  </div>

                  {/* TICK BOX: No Q&A for this module */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100/70 transition-colors">
                    <input
                      type="checkbox"
                      checked={mod.noQuiz}
                      onChange={(e) => handleToggleNoQuiz(modIdx, e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        ☑ Is module ke liye koi Q&A nahi hai (No Q&A for this module - Skip)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Agar aapko is module me practice question ya quiz nahi rakhna, toh yaha tick karein.
                      </p>
                    </div>
                  </label>

                  {/* If NO Q&A is ticked */}
                  {mod.noQuiz ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>
                        Q&A skipped for Module {modIdx + 1}. Students can directly watch lectures without answering questions.
                      </span>
                    </div>
                  ) : (
                    /* If Q&A is enabled: Show Question & Options fields */
                    <div className="space-y-3 pt-1">
                      {errors[`quiz_${modIdx}`] && (
                        <p className="text-xs text-red-600 font-semibold">
                          {errors[`quiz_${modIdx}`]}
                        </p>
                      )}

                      <Input
                        label={`Practice Question for Module ${modIdx + 1}`}
                        placeholder="e.g. What is the German word for 'Hello'?"
                        value={mod.quiz.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setModules((prev) =>
                            prev.map((m, i) =>
                              i === modIdx
                                ? { ...m, quiz: { ...m.quiz, question: val } }
                                : m
                            )
                          );
                        }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          label="Option A"
                          value={mod.quiz.optionA}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, optionA: val } }
                                  : m
                              )
                            );
                          }}
                        />

                        <Input
                          label="Option B"
                          value={mod.quiz.optionB}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, optionB: val } }
                                  : m
                              )
                            );
                          }}
                        />

                        <Input
                          label="Option C"
                          value={mod.quiz.optionC}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, optionC: val } }
                                  : m
                              )
                            );
                          }}
                        />

                        <Input
                          label="Option D"
                          value={mod.quiz.optionD}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, optionD: val } }
                                  : m
                              )
                            );
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Select
                          label="Correct Answer"
                          value={mod.quiz.correctIndex}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, correctIndex: val } }
                                  : m
                              )
                            );
                          }}
                        >
                          <option value={0}>Option A is Correct</option>
                          <option value={1}>Option B is Correct</option>
                          <option value={2}>Option C is Correct</option>
                          <option value={3}>Option D is Correct</option>
                        </Select>

                        <Input
                          label="Explanation for Students"
                          placeholder="Why is this answer correct?"
                          value={mod.quiz.explanation}
                          onChange={(e) => {
                            const val = e.target.value;
                            setModules((prev) =>
                              prev.map((m, i) =>
                                i === modIdx
                                  ? { ...m, quiz: { ...m.quiz, explanation: val } }
                                  : m
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleAddModule}
              leftIcon={<PlusCircle className="w-4 h-4 text-sky-600" />}
            >
              + Add Another Module
            </Button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/courses")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="bg-sky-600 hover:bg-sky-700 text-white"
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Save & Publish Complete Course
          </Button>
        </div>
      </form>
    </div>
  );
}
