"use client";

import React, { useState } from "react";
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

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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
    </header>
  );
};
