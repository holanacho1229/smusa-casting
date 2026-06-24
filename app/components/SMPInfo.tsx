"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Non-Surgical",
    body: "No incisions, no stitches, no downtime. SMP is a non-invasive cosmetic procedure performed with specialized micro-needles.",
    stat: "0",
    statLabel: "Surgical risk",
  },
  {
    title: "Immediate Results",
    body: "Walk out looking transformed. Results are visible after the very first session with full density achieved over 2–3 visits.",
    stat: "2–3",
    statLabel: "Sessions total",
  },
  {
    title: "Permanent",
    body: "Unlike topical solutions or medications, SMP is a lasting solution. A single touch-up every few years maintains a sharp, clean look.",
    stat: "10+",
    statLabel: "Years of confidence",
  },
];

const galleryPlaceholders = [
  { label: "Before", sub: "Client photo will appear here" },
  { label: "After", sub: "Client photo will appear here" },
  { label: "Session", sub: "Client photo will appear here" },
  { label: "Result", sub: "Client photo will appear here" },
];

export default function SMPInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="px-6 md:px-12"
      style={{
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--color-accent)" }}
          >
            What is SMP?
          </p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            The Ultimate<br />Hair Loss Solution.
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`p-8 rounded-sm transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <p
                className="text-4xl font-black mb-1"
                style={{ fontFamily: "var(--font-syne)", color: "var(--color-accent)" }}
              >
                {f.stat}
              </p>
              <p
                className="text-[10px] tracking-[0.18em] uppercase mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {f.statLabel}
              </p>
              <h3
                className="text-lg font-bold uppercase tracking-wide mb-3"
                style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed font-light"
                style={{ color: "var(--color-text-muted)" }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery grid — placeholders */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Results — Before &amp; After
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryPlaceholders.map((item, i) => (
              <div
                key={i}
                className="aspect-square flex flex-col items-center justify-center rounded-sm"
                style={{
                  background: "var(--color-surface-elevated)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-[10px] text-center px-4"
                  style={{ color: "var(--color-border)" }}
                >
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
