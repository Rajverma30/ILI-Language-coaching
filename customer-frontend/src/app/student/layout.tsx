"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useDemo } from "@/context/DemoContext";
import {
  GraduationCap,
  BookOpen,
  User,
  ShoppingBag,
  LogOut,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout } = useDemo();

  const navItems = [
    { label: "Dashboard", href: "/student", icon: Layers },
    { label: "My Enrolled Courses", href: "/student/courses", icon: BookOpen },
    { label: "Purchase History", href: "/student/orders", icon: ShoppingBag },
    { label: "Student Profile", href: "/student/profile", icon: User },
  ];

  return (
    <AuthGuard allowedRole="student">
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {/* Student Portal Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Brand Link */}
              <div className="flex items-center gap-6">
                <Link href="/student" className="flex items-center gap-3">
                  <img src="/logo.png" alt="ILI" className="h-10 w-auto object-contain" />
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          active
                            ? "bg-sky-50 text-sky-700"
                            : "text-slate-600 hover:text-sky-700 hover:bg-sky-50/50"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* User Profile & Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-700 transition-colors"
                >
                  <span>Public Site</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser?.name?.[0] || "R"}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">
                      {currentUser?.name || "Raj Verma"}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {currentUser?.email || "Student"}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Nav Bar */}
            <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 p-1 ${
                      active ? "text-sky-600 font-bold" : "text-slate-500"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px]">{item.label.split(" ")[0]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
