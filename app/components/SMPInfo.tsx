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
    body: "Unlike topical solutions or medications, SMP is a lasting solution. A small touch-up every 4-6 years maintains the natural looking results.",
    stat: "10+",
    statLabel: "Years of confidence",
  },
];

// Two real before/after client transformations.
const galleryPlaceholders = [
  { label: "Before", img: "/assets/images/before.jpg", placeholder: false, position: "center 22%" },
  { label: "After", img: "/assets/images/after.jpg", placeholder: false, position: "center 22%" },
  { label: "Before", img: "/assets/images/before2.jpg", placeholder: false, position: "center 30%" },
  { label: "After", img: "/assets/images/after2.jpg", placeholder: false, position: "center 28%" },
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
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="flex items-center justify-between mb-8"
            style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.1rem" }}
          >
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              What is SMP?
            </span>
            <span
              className="text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              02 <span style={{ opacity: 0.4 }}>/ 03</span>
            </span>
          </div>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
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

        {/* Gallery — two real before/after transformations, shown as two grouped
            pairs. Lifted above the grain overlay (z-[60]) so the proof photos
            render clean/unaltered while grain stays on the rest of the block. */}
        <div
          className={`transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Results — Before &amp; After
          </p>
          <div className="relative z-[60] flex flex-col sm:flex-row items-stretch gap-5">
            {[
              [0, 1],
              [2, 3],
            ].map((pair, gi) => (
              <div
                key={gi}
                className={`grid grid-cols-2 gap-3 flex-1 ${
                  gi === 1 ? "sm:border-l sm:pl-5" : ""
                }`}
                style={gi === 1 ? { borderColor: "var(--color-border)" } : undefined}
              >
                {pair.map((idx) => {
                  const item = galleryPlaceholders[idx];
                  return (
                    <div
                      key={idx}
                      className="relative aspect-square overflow-hidden"
                      style={{ border: "1px solid var(--color-border)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.placeholder ? `${item.label} — placeholder` : `SMP ${item.label.toLowerCase()} — real client result`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: item.position }}
                      />
                      {/* Dark gradient for label legibility */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(9,9,9,0.85) 0%, rgba(9,9,9,0.1) 45%, rgba(9,9,9,0.15) 100%)",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2.5">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-widest"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {item.label}
                        </span>
                        {item.placeholder && (
                          <span
                            className="text-[8px] uppercase tracking-wider"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            Placeholder
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
