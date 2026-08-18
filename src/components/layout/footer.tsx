import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050d18]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
            Full-service digital marketing, web design, and SEO for brands ready
            to turn clicks into clients.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-cyan-300" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.emailHref}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
