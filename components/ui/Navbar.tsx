"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShieldAlert } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "01. Work", href: "#projects" },
    { label: "02. Open Source", href: "#oss" },
    { label: "03. Experience", href: "#experience" },
    { label: "04. Skills", href: "#skills" },
    { label: "05. Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded bg-surface border border-border-subtle group-hover:border-accent-primary transition-all duration-300 flex items-center justify-center overflow-hidden shadow-glow-blue p-0.5">
            <Image
              src="/assets/logo.png"
              alt="Sudipto Satpati Monogram Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-mono text-xs font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
              Sudipto Satpati
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-text-secondary hover:text-accent-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="h-4 w-px bg-border-subtle" />
          <Link
            href="/admin"
            title="Admin Login"
            className="p-1.5 rounded border border-border-subtle text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/admin"
            title="Admin Login"
            className="p-1.5 rounded border border-border-subtle text-text-muted hover:text-accent-primary"
          >
            <ShieldAlert className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded border border-border-subtle text-text-primary hover:text-accent-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-tier2 border-b border-border-subtle px-4 py-4 space-y-3 font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-text-secondary hover:text-accent-primary transition-colors border-b border-border-subtle/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
