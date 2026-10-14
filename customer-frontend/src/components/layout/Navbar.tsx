"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import {
  Languages,
  GraduationCap,
  Menu,
  X,
  LogOut,
  Sparkles,
  User,
  ArrowRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SmartCourseSearch } from "@/components/search/SmartCourseSearch";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, logout } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md group-hover:bg-sky-700 transition-colors">
              <Languages className="w-6 h-6 text-sky-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-slate-900 leading-tight">
                ILI <span className="text-sky-600">Languages</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
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
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? "text-sky-600 font-semibold bg-sky-50"
                      : "text-slate-700 hover:text-sky-600 hover:bg-sky-50/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Search Button on Desktop */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-sky-600" />
            <span>Search courses...</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 font-mono shadow-2xs">
              Ctrl K
            </kbd>
          </button>

          {/* Right Action Buttons - Customer Portal Only */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href="/demo"
              variant="gradient"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-white" />}
              rightIcon={
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              }
            >
              Book Demo Session
            </Button>

            {currentUser && currentUser.role === "student" ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/student"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <span>Student Portal</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-sky-200" />
                  <span>Student Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Search courses"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium rounded-md text-slate-800 hover:bg-sky-50 hover:text-sky-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Button
              href="/demo"
              variant="gradient"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
              leftIcon={<Sparkles className="w-4 h-4 text-white" />}
              rightIcon={
                <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              }
            >
              Book Demo Session
            </Button>

            {currentUser && currentUser.role === "student" ? (
              <div className="space-y-2">
                <Link
                  href="/student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block px-4 py-2.5 rounded-lg text-xs font-bold bg-sky-600 text-white"
                >
                  Enter Student Portal ({currentUser.name})
                </Link>
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
              <div>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-lg text-xs font-bold bg-sky-600 text-white"
                >
                  Student Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Smart Search Modal Overlay */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Smart Course Search</h3>
                  <p className="text-[11px] text-slate-500">
                    Typo-tolerant instant search for German, English, French, Spanish & Japanese
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <SmartCourseSearch onSelectCourse={() => setSearchModalOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};
