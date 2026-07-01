"use client";

import { useEffect, useRef, useState } from "react";

export default function StatementBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
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
        background: "var(--color-accent)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top rule + label, dark-on-orange */}
        <div
          className={`flex items-center justify-between mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ borderTop: "1px solid rgba(9,9,9,0.25)", paddingTop: "1.1rem" }}
        >
          <span
            className="text-xs tracking-[0.25em] uppercase font-medium"
            style={{ color: "var(--color-bg)" }}
          >
            Why It Matters
          </span>
          <span
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(9,9,9,0.6)" }}
          >
            No Cost — To You
          </span>
        </div>

        <h2
          className={`font-black uppercase leading-[0.9] tracking-tight mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
            color: "var(--color-bg)",
            transitionDelay: "120ms",
          }}
        >
          Real Stories,<br />Fully Sponsored.
        </h2>

        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "260ms" }}
        >
          {/* Left — copy + CTA */}
          <div className="max-w-xl">
            <p
              className="text-lg leading-relaxed font-light mb-8"
              style={{ color: "rgba(9,9,9,0.8)", maxWidth: "48ch" }}
            >
              Every month, Matt covers the entire cost of an SMP transformation for
              a handful of people — in exchange for sharing their journey on camera.
              No catch, no fee. Just your story.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              style={{
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
                padding: "0.9rem 1.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-bg)")}
            >
              Apply For This Month →
            </a>
          </div>

          {/* Right — founder portrait */}
          <figure className="shrink-0 flex items-end gap-4">
            <div
              className="relative overflow-hidden"
              style={{
                width: "132px",
                height: "160px",
                border: "1px solid rgba(9,9,9,0.35)",
              }}
            >
              {/* Placeholder headshot — swap for Matt's real photo before launch */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                alt="Matt Iulo, Founder of Scalp Micro USA"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
              />
            </div>
            <figcaption className="pb-1">
              <p
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ fontFamily: "var(--font-syne)", color: "var(--color-bg)" }}
              >
                Matt Iulo
              </p>
              <p
                className="text-[11px] tracking-[0.15em] uppercase mt-1"
                style={{ color: "rgba(9,9,9,0.65)" }}
              >
                Founder — Scalp Micro USA
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
