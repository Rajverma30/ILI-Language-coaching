"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export default function DemoBookingPage() {
  const { courses, addLead } = useDemo();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    courseInterest: courses[0]?.title || "German A1: Complete Foundation for Beginners",
    proficiency: "Absolute Beginner (No Prior Experience)",
    mode: "In-Person Classroom (Apollo Tower, Indore)",
    preferredSlot: "Saturday 11:00 AM (Orientation & Trial)",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Please enter your name";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      errs.phone = "Please enter a valid 10-digit phone number";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Please enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const lead = addLead({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        courseInterest: `${form.courseInterest} [Demo: ${form.mode}]`,
        preferredSlot: form.preferredSlot,
        preferredContactMethod: "WhatsApp",
        message: `Proficiency: ${form.proficiency}. Slot: ${form.preferredSlot}. Notes: ${form.notes}`,
        source: "Demo Booking",
      });

      setIsSubmitting(false);
      setSubmittedLeadId(lead.id);
    }, 500);
  };

  return (
    <PublicLayout>
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "Free Demo Class" }]} />

          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#801D30] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Orientation</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1D38]">
              Reserve Your Free Demo Session
            </h1>
            <p className="text-sm sm:text-base text-[#5C6479]">
              Experience our interactive immersion methodology firsthand at Apollo Tower, MG Road, Indore or via live digital video before making any enrollment commitment.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Bar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 space-y-4 shadow-xs">
              <h3 className="font-editorial text-xl font-bold text-[#0F1D38]">
                What Happens in a Demo?
              </h3>

              <div className="space-y-3.5 text-xs text-[#1E293B]">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF4E6] text-[#8C6D23] flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold">Faculty Introduction & Phonetic Drill</h4>
                    <p className="text-stone-500 mt-0.5">
                      Learn the first sounds, greetings, and pronunciation secrets directly with our certified language trainer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF4E6] text-[#8C6D23] flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold">Curriculum & Exam Roadmap</h4>
                    <p className="text-stone-500 mt-0.5">
                      Understanding Goethe/DELF/DELE levels, timelines, visa requirements, and study hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF4E6] text-[#8C6D23] flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold">LMS Portal & Recorded Revision Walkthrough</h4>
                    <p className="text-stone-500 mt-0.5">
                      Preview how students use this video learning dashboard alongside live Apollo Tower classes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>No payment required for demo session</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#801D30]" />
                  <span>Classroom lab: Apollo Tower, New Palasia, Indore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-8 shadow-lg">
              {!submittedLeadId ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-stone-100 pb-3">
                    <h2 className="font-editorial text-xl font-bold text-[#0F1D38]">
                      Demo Registration Form
                    </h2>
                    <p className="text-xs text-stone-500">
                      Fill out this brief form to reserve your trial seat.
                    </p>
                  </div>

                  <Input
                    label="Full Name"
                    placeholder="e.g. Raj Verma"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    error={errors.fullName}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone / WhatsApp Number"
                      placeholder="+91 98260 12345"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      error={errors.phone}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      error={errors.email}
                    />
                  </div>

                  <Select
                    label="Target Language Course"
                    value={form.courseInterest}
                    onChange={(e) => setForm({ ...form, courseInterest: e.target.value })}
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </Select>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Attendance Mode"
                      value={form.mode}
                      onChange={(e) => setForm({ ...form, mode: e.target.value })}
                    >
                      <option value="In-Person Classroom (Apollo Tower, Indore)">
                        In-Person (Apollo Tower, Indore)
                      </option>
                      <option value="Live Online Interactive Session">
                        Live Online (Interactive Video)
                      </option>
                    </Select>

                    <Select
                      label="Preferred Demo Slot"
                      value={form.preferredSlot}
                      onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                    >
                      <option value="Saturday 11:00 AM (Orientation & Trial)">Saturday 11:00 AM</option>
                      <option value="Sunday 11:00 AM (Orientation & Trial)">Sunday 11:00 AM</option>
                      <option value="Weekday Evening 6:30 PM (Trial)">Weekday Evening 6:30 PM</option>
                    </Select>
                  </div>

                  <Select
                    label="Current Language Proficiency"
                    value={form.proficiency}
                    onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
                  >
                    <option value="Absolute Beginner (No Prior Experience)">Absolute Beginner</option>
                    <option value="Basic Familiarity (Self-studied/App)">Basic Familiarity (App/Self-study)</option>
                    <option value="A1 Completed / Refreshing for A2/B1">A1 Completed / Need Intermediate</option>
                  </Select>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full"
                      leftIcon={<Sparkles className="w-4 h-4 text-[#E0C17E]" />}
                    >
                      Confirm Free Demo Registration
                    </Button>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center">
                    Simulated Demo Submission: This lead is registered immediately into the Admin Leads system for evaluation.
                  </p>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                    Demo Class Reserved!
                  </h3>

                  <p className="text-sm text-[#5C6479] max-w-md mx-auto leading-relaxed">
                    Hello <strong>{form.fullName}</strong>! Your demo orientation slot for <strong>{form.courseInterest}</strong> has been registered.
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700 max-w-sm mx-auto text-left space-y-1">
                    <div><strong>Slot:</strong> {form.preferredSlot}</div>
                    <div><strong>Mode:</strong> {form.mode}</div>
                    <div><strong>Lead ID:</strong> <code>{submittedLeadId}</code></div>
                    <div className="text-emerald-700 font-semibold pt-1">
                      Status: Active in Admin Leads Management
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmittedLeadId(null);
                        setForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          courseInterest: courses[0]?.title || "German A1",
                          proficiency: "Absolute Beginner",
                          mode: "In-Person Classroom (Apollo Tower, Indore)",
                          preferredSlot: "Saturday 11:00 AM",
                          notes: "",
                        });
                      }}
                    >
                      Book Another Demo
                    </Button>
                    <Link
                      href="/admin/leads"
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0F1D38] text-white hover:bg-[#1A2E56]"
                    >
                      <span>Check Admin Leads &rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
