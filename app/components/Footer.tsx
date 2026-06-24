"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-10"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Logo */}
        <Image
          src="/assets/images/logo-black.png"
          alt="Scalp Micro USA"
          width={120}
          height={32}
          className="invert opacity-60"
        />

        {/* Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
          {[
            { label: "Main Website", href: "https://scalpmicrousa.com" },
            { label: "Privacy Policy", href: "#" },
            { label: "Media Terms", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid var(--color-border)" }}>
        <p
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "var(--color-text-muted)", opacity: 0.4 }}
        >
          &copy; {new Date().getFullYear()} Scalp Micro USA. All rights reserved.
        </p>
        <p
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "var(--color-text-muted)", opacity: 0.4 }}
        >
          Applications always open.
        </p>
      </div>
    </footer>
  );
}
