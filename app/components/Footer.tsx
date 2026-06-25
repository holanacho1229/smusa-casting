"use client";

export default function Footer() {
  return (
    <footer
      className="py-10"
      style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)" }}
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
        >
          Scalp Micro USA
        </span>

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
