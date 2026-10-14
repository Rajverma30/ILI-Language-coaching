"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CourseLanguage, CourseLevel } from "@/types";
import { PlusCircle, ArrowLeft, Sparkles } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();
  const { addCourse } = useDemo();

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
    instructorName: "Frau Ananya Saxena (Demo)",
    instructorTitle: "Senior Language Faculty",
    instructorBio: "Experienced language coach certified by international examining bodies.",
    highlights: "Phonetic drills, CEFR standard syllabus, Goethe mock papers, Recorded review",
    prerequisites: "Open to beginners. No previous experience needed.",
    certificateInfo: "ILI Certificate of Language Proficiency & Mock Test Report.",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Course title is required";
    if (!form.slug.trim()) errs.slug = "URL slug is required";
    if (!form.shortDescription.trim()) errs.shortDescription = "Short description is required";
    if (form.samplePrice <= 0) errs.samplePrice = "Price must be greater than zero";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
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
    });

    setIsSubmitting(false);
    router.push(`/admin/courses/${newCourse.id}/curriculum`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/admin/courses" },
            { label: "Create Course" },
          ]}
        />
        <h1 className="font-editorial text-3xl font-extrabold text-[#0F1D38]">
          Create Language Course
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6479]">
          Fill in curriculum details, then you will be redirected to organize modules and recorded lectures.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-10 shadow-xs space-y-8">
        {/* Core Metadata */}
        <div className="space-y-4">
          <h2 className="font-editorial text-lg font-bold text-[#0F1D38] border-b border-stone-100 pb-2">
            1. Basic Program Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Course Title"
              placeholder="e.g. Italian A1: Conversational Foundations"
              required
              value={form.title}
              onChange={handleTitleChange}
              error={errors.title}
            />

            <Input
              label="URL Slug"
              placeholder="e.g. italian-a1-beginner"
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
              <option value="Advanced">Advanced (C1)</option>
              <option value="JLPT N5">JLPT N5</option>
            </Select>

            <Input
              label="Duration (Hours)"
              type="number"
              value={form.durationHours}
              onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })}
            />

            <Input
              label="Sample Tuition Fee (₹)"
              type="number"
              required
              value={form.samplePrice}
              onChange={(e) => setForm({ ...form, samplePrice: Number(e.target.value) })}
              error={errors.samplePrice}
            />
          </div>

          <Textarea
            label="Short Summary (shown in cards)"
            rows={2}
            required
            placeholder="Brief overview of curriculum objectives and exam blueprint..."
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            error={errors.shortDescription}
          />

          <Textarea
            label="Full Description"
            rows={4}
            placeholder="Comprehensive description of pedagogical approach, classroom drills, and outcomes..."
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
          />
        </div>

        {/* Instructor & Media */}
        <div className="space-y-4">
          <h2 className="font-editorial text-lg font-bold text-[#0F1D38] border-b border-stone-100 pb-2">
            2. Instructor & Cover Media
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Faculty Name"
              placeholder="e.g. Dr. Ramesh Joshi"
              value={form.instructorName}
              onChange={(e) => setForm({ ...form, instructorName: e.target.value })}
            />

            <Input
              label="Faculty Title / Credentials"
              placeholder="e.g. Goethe C1 Certified, 8+ Years Experience"
              value={form.instructorTitle}
              onChange={(e) => setForm({ ...form, instructorTitle: e.target.value })}
            />
          </div>

          <Input
            label="Cover Image URL (Unsplash or direct image link)"
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />

          <Input
            label="Key Syllabus Highlights (comma-separated)"
            placeholder="Item 1, Item 2, Item 3"
            value={form.highlights}
            onChange={(e) => setForm({ ...form, highlights: e.target.value })}
          />
        </div>

        <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/courses")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            isLoading={isSubmitting}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Save & Build Curriculum Modules &rarr;
          </Button>
        </div>
      </form>
    </div>
  );
}
