"use client";

import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CourseLanguage, CourseLevel } from "@/types";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const router = useRouter();
  const { getCourseById, updateCourse } = useDemo();

  const course = getCourseById(courseId);

  const [form, setForm] = useState(() => ({
    title: course?.title || "",
    slug: course?.slug || "",
    language: (course?.language || "German") as CourseLanguage,
    level: (course?.level || "A1") as CourseLevel,
    shortDescription: course?.shortDescription || "",
    fullDescription: course?.fullDescription || "",
    durationHours: course?.durationHours || 60,
    samplePrice: course?.samplePrice || 12000,
    originalPrice: course?.originalPrice || (course?.samplePrice ? course.samplePrice + 3000 : 15000),
    coverImage: course?.coverImage || "",
    instructorName: course?.instructorName || "",
    instructorTitle: course?.instructorTitle || "",
    instructorBio: course?.instructorBio || "",
    highlights: course?.highlights?.join(", ") || "",
    prerequisites: course?.prerequisites || "",
    certificateInfo: course?.certificateInfo || "",
  }));

  const [saved, setSaved] = useState(false);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="font-editorial text-xl font-bold">Course Not Found</h2>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push("/admin/courses")}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse(course.id, {
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
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/admin/courses");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/admin/courses" },
            { label: `Edit: ${course.title}` },
          ]}
        />
        <div className="flex items-center justify-between">
          <h1 className="font-editorial text-3xl font-extrabold text-[#0F1D38]">
            Edit Course Details
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/courses/${course.id}/curriculum`)}
          >
            Manage Curriculum Modules &rarr;
          </Button>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Course updated successfully in local storage!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Course Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Input
            label="URL Slug"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
            label="Level"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value as CourseLevel })}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="Advanced">Advanced</option>
            <option value="JLPT N5">JLPT N5</option>
          </Select>

          <Input
            label="Duration (Hours)"
            type="number"
            value={form.durationHours}
            onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })}
          />

          <Input
            label="Sample Fee (₹)"
            type="number"
            value={form.samplePrice}
            onChange={(e) => setForm({ ...form, samplePrice: Number(e.target.value) })}
          />
        </div>

        <Textarea
          label="Short Description"
          rows={2}
          value={form.shortDescription}
          onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
        />

        <Textarea
          label="Full Description"
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
            label="Instructor Title"
            value={form.instructorTitle}
            onChange={(e) => setForm({ ...form, instructorTitle: e.target.value })}
          />
        </div>

        <Input
          label="Cover Image URL"
          value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
        />

        <Input
          label="Highlights (comma-separated)"
          value={form.highlights}
          onChange={(e) => setForm({ ...form, highlights: e.target.value })}
        />

        <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
            Cancel
          </Button>
          <Button type="submit" variant="secondary">
            Save Course Updates
          </Button>
        </div>
      </form>
    </div>
  );
}
