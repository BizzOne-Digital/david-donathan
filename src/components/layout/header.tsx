"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

export function Header() {
  const pathname = usePathname();
  const { openModal } = useLeadModal();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 font-display text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            DD
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-tight text-white group-hover:text-cyan-200">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-slate-400 sm:block">
              Digital Agency since {siteConfig.founded}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/book" className="btn-primary hidden sm:inline-flex">
            Book a Meeting
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#07111f] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-slate-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Book a Meeting
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openModal({ source: "Mobile Menu CTA" });
              }}
              className="btn-secondary mt-2"
            >
              Get a Free Proposal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
