"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const px = "clamp(1.5rem, 5vw, 5rem)";

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder portrait — swap for hero video/still before launch */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 h-full w-[60%] object-cover"
          style={{
            filter: "grayscale(1) contrast(1.05)",
            opacity: 0.28,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 40% 45%, rgba(30,26,24,0.85) 0%, rgba(13,11,10,0.7) 50%, rgba(9,9,9,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, var(--color-accent), transparent 60%)",
          }}
        />
      </div>

      {/* Registration frame — corner marks, dossier device */}
      <CornerMarks inset={px} visible={visible} />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between pt-8"
        style={{ paddingLeft: px, paddingRight: px }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="text-[11px] tracking-[0.28em] uppercase font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Scalp Micro USA
            <span style={{ color: "var(--color-accent)" }}>®</span>
          </span>
          <span
            className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            / Documentary Casting
          </span>
        </div>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200"
          style={{
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
            padding: "0.55rem 1rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.background = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Apply Now <span style={{ color: "var(--color-accent)" }}>↗</span>
        </a>
      </nav>

      {/* Hero Content — vertically centered in remaining space */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center"
        style={{
          paddingLeft: px,
          paddingRight: px,
          paddingTop: "clamp(3rem, 6vw, 6rem)",
          paddingBottom: "clamp(4rem, 8vw, 8rem)",
        }}
      >
        {/* Eyebrow */}
        <p
          className={`text-xs tracking-[0.25em] uppercase mb-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ color: "var(--color-accent)", transitionDelay: "0ms" }}
        >
          The Documentary Project
        </p>

        {/* Headline */}
        <h1
          className={`font-black uppercase leading-[0.88] tracking-tight mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2.8rem, 7vw, 7rem)",
            color: "var(--color-text-primary)",
            transitionDelay: "120ms",
          }}
        >
          Share Your<br />
          Story.<br />
          <span style={{ color: "var(--color-accent)" }}>
            Transform
          </span>{" "}
          Your Life.
        </h1>

        {/* Subhead + CTA — stacked cleanly */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "280ms" }}
        >
          <p
            className="text-base leading-relaxed font-light mb-8"
            style={{ color: "var(--color-text-muted)", maxWidth: "46ch" }}
          >
            Submit your application for a chance to receive a fully sponsored
            SMP transformation with Matt Iulo — and share your hair loss journey
            on camera.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-primary)",
              padding: "0.75rem 1.5rem",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--color-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--color-accent)")
            }
          >
            Apply Now →
          </a>
        </div>

        {/* Casting card — fills the right void, echoes Mattis's framed block */}
        <div
          className={`hidden lg:block absolute transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            right: px,
            bottom: "clamp(7rem, 15vh, 11rem)",
            width: "252px",
            border: "1px solid var(--color-border)",
            background: "rgba(20,20,20,0.35)",
            backdropFilter: "blur(2px)",
            transitionDelay: "420ms",
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <span
              className="text-[10px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Now Casting
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
          </div>
          <ul className="px-5 py-4 space-y-3">
            {[
              "100% sponsored SMP",
              "Documented on camera",
              "New stories monthly",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 w-1 h-1 shrink-0"
                  style={{ background: "var(--color-accent)" }}
                />
                <span
                  className="text-[13px] leading-snug font-light"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom micro-label row — encodes real state, dossier device */}
      <div
        className={`absolute bottom-8 z-10 hidden md:flex items-center gap-6 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: px, transitionDelay: "600ms" }}
      >
        {["Applications — Open", "Fully Sponsored", "Selected Monthly"].map(
          (label, i) => (
            <span key={label} className="flex items-center gap-6">
              {i > 0 && (
                <span
                  className="w-px h-3"
                  style={{ background: "var(--color-border)" }}
                />
              )}
              <span
                className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ color: "var(--color-text-muted)" }}
              >
                {label}
              </span>
            </span>
          )
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 z-10 hidden md:flex flex-col items-center gap-2 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ right: px, transitionDelay: "600ms" }}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          Scroll
        </span>
        <div className="w-px h-12" style={{ background: "var(--color-border)" }} />
      </div>
    </section>
  );
}

// Four L-shaped corner marks framing the hero — registration/viewfinder device.
function CornerMarks({ inset, visible }: { inset: string; visible: boolean }) {
  const size = "14px";
  const color = "var(--color-border)";
  const corners = [
    { top: inset, left: inset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    { top: inset, right: inset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    { bottom: inset, left: inset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    { bottom: inset, right: inset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`absolute z-10 pointer-events-none transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: size, height: size, transitionDelay: "500ms", ...c }}
        />
      ))}
    </>
  );
}
