"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  MapPin,
  Calendar,
  Lock,
  LogOut,
  CheckCircle2,
} from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, currentStudent, logout, courses } = useDemo();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const enrolledCourseNames = courses
    .filter((c) => currentStudent?.enrolledCourseIds.includes(c.id))
    .map((c) => c.title);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Student Portal", href: "/student" },
            { label: "Student Profile" },
          ]}
        />
        <h1 className="font-editorial text-3xl font-extrabold text-slate-900">
          Student Account & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Manage your personal details, enrolled batch credentials, and session preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Profile Card */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-4 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
              {currentUser?.name?.[0] || "R"}
            </div>

            <div>
              <h2 className="font-editorial text-xl font-bold text-slate-900">
                {currentUser?.name || "Raj Verma"}
              </h2>
              <p className="text-xs text-slate-500">{currentUser?.email}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                Verified Student
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 text-left space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>Indore Center (Apollo Tower)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentStudent?.phone || "+91 98270 98765"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Member Since: {currentStudent?.joinedDate || "Sept 2024"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={logout}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Demo Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Password Form */}
        <div className="md:col-span-7 space-y-6">
          {/* Enrolled Courses Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-editorial text-lg font-bold text-slate-900">
              Active Course Enrollments
            </h3>

            <div className="space-y-2">
              {enrolledCourseNames.map((name) => (
                <div
                  key={name}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 flex items-center justify-between"
                >
                  <span>{name}</span>
                  <span className="text-[11px] text-sky-600 font-bold">Classroom + Online</span>
                </div>
              ))}
            </div>
          </div>

          {/* Change Password Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Security Settings
              </h3>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>

            {passwordSaved && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Demo password updated in browser memory!</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <Input
                label="Current Password"
                type="password"
                required
                placeholder="12345"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
              />

              <Input
                label="New Password"
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
              />

              <Input
                label="Confirm New Password"
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="sm">
                  Update Demo Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
