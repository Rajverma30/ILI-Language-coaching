"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useDemo } from "@/context/DemoContext";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  MessageSquareCheck,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Languages,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout, leads } = useDemo();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Exclude login page from admin sidebar wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Course Management", href: "/admin/courses", icon: BookOpen },
    { label: "Create New Course", href: "/admin/courses/new", icon: PlusCircle },
    { label: "Enrolled Students", href: "/admin/students", icon: Users },
    {
      label: "Enquiries & Leads",
      href: "/admin/leads",
      icon: MessageSquareCheck,
      badge: newLeadsCount > 0 ? `${newLeadsCount} new` : undefined,
    },
    { label: "Sample Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Institute Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <AuthGuard allowedRole="admin">
      <div className="min-h-screen flex bg-[#FAF8F5] text-[#0F1D38]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0A1325] text-stone-300 border-r border-[#1E3156] shrink-0">
          {/* Brand */}
          <div className="p-5 border-b border-[#1E3156]">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#801D30] text-white flex items-center justify-center shadow-xs">
                <Languages className="w-5 h-5 text-[#E0C17E]" />
              </div>
              <div>
                <span className="font-editorial text-lg font-bold text-white block leading-tight">
                  ILI Admin Desk
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Apollo Tower, Indore
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#801D30] text-white shadow-xs"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E0C17E] text-[#0F1D38]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions & User Profile */}
          <div className="p-4 border-t border-[#1E3156] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800">
              <div className="text-xs">
                <span className="font-bold text-white block truncate max-w-[130px]">
                  {currentUser?.name || "Admin Desk"}
                </span>
                <span className="text-[10px] text-stone-400 block">Indore Campus</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 text-stone-400 hover:text-red-400 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Admin Header Bar */}
          <header className="bg-white border-b border-[#E8E2D8] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
                aria-label="Open Admin Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF2F8] text-[#0F1D38] text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#801D30]" />
                  <span>Administrative Console</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/courses/new"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#801D30] text-white hover:bg-[#9B283E] shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Course</span>
              </Link>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-700 font-medium cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-2xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-xs bg-[#0A1325] text-stone-300 flex flex-col p-4 shadow-2xl z-10">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E3156] mb-3">
                <span className="font-editorial text-base font-bold text-white">
                  ILI Admin
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#1E3156]">
                <button
                  onClick={() => {
                    logout();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full text-left text-xs font-medium text-red-400 py-1"
                >
                  Sign Out of Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
