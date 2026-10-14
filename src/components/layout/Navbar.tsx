"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import {
  Languages,
  GraduationCap,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Sparkles,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, logout } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Language Courses", href: "/courses" },
    { label: "Learning Approach", href: "/#approach" },
    { label: "About Institute", href: "/about" },
    { label: "Contact Indore", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-lg bg-[#0F1D38] text-white flex items-center justify-center shadow-md group-hover:bg-[#801D30] transition-colors">
              <Languages className="w-6 h-6 text-[#E0C17E]" />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-[#0F1D38] leading-tight">
                ILI <span className="text-[#801D30]">Languages</span>
              </span>
              <span className="text-[11px] font-medium text-[#5C6479] tracking-wider uppercase">
                Apollo Tower, Indore
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "text-[#801D30] font-semibold bg-[#801D30]/5"
                      : "text-[#1E293B] hover:text-[#801D30] hover:bg-black/2"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#801D30] bg-[#801D30]/8 border border-[#801D30]/20 hover:bg-[#801D30]/15 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#801D30]" />
              <span>Book Demo Class</span>
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                {currentUser.role === "student" ? (
                  <Link
                    href="/student"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0F1D38] text-white hover:bg-[#1A2E56] transition-colors shadow-xs"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#E0C17E]" />
                    <span>Student Portal</span>
                  </Link>
                ) : (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#801D30] text-white hover:bg-[#9B283E] transition-colors shadow-xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Admin Desk</span>
                  </Link>
                )}

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-stone-500 hover:text-red-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0F1D38] text-white hover:bg-[#1A2E56] transition-colors shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-[#E0C17E]" />
                  <span>Student Login</span>
                </Link>
                <Link
                  href="/admin/login"
                  className="p-2 text-stone-400 hover:text-[#0F1D38] rounded-lg transition-colors text-xs font-medium"
                  title="Administrative Staff Portal"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#0F1D38] hover:bg-stone-200/50 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-md text-[#0F1D38] hover:bg-[#FAF8F5] hover:text-[#801D30]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg text-xs font-bold text-[#801D30] bg-[#FAF0F2] border border-[#F3CFD6]"
            >
              Book Free Demo Session
            </Link>

            {currentUser ? (
              <div className="space-y-2">
                {currentUser.role === "student" ? (
                  <Link
                    href="/student"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center block px-4 py-2.5 rounded-lg text-xs font-bold bg-[#0F1D38] text-white"
                  >
                    Enter Student Portal ({currentUser.name})
                  </Link>
                ) : (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center block px-4 py-2.5 rounded-lg text-xs font-bold bg-[#801D30] text-white"
                  >
                    Enter Admin Desk
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs font-medium text-red-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2.5 rounded-lg text-xs font-bold bg-[#0F1D38] text-white"
                >
                  Student Login
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2.5 rounded-lg text-xs font-bold bg-stone-100 text-[#0F1D38] border border-stone-200"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
