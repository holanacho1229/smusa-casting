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
          className={`flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-10 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "260ms" }}
        >
          {/* Left — copy + CTA */}
          <div className="max-w-xl flex flex-col justify-end">
            <p
              className="text-lg leading-relaxed font-light mb-8"
              style={{ color: "rgba(9,9,9,0.82)", maxWidth: "42ch" }}
            >
              Every month we fully sponsor a handful of SMP transformations —
              no cost, no catch. Selection is personal, and every story is
              documented from first session to final result.
            </p>
            <a
              href="#apply"
              className="self-start inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
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

          {/* Right — "from the founder" card. Sits ABOVE the grain overlay
              (relative z-[60]) on a solid dark panel so the portrait stays crisp. */}
          <figure
            className="relative z-[60] shrink-0 flex w-full lg:w-auto lg:max-w-md overflow-hidden"
            style={{ background: "var(--color-surface)", border: "1px solid rgba(9,9,9,0.4)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/matt-iulo.png"
              alt="Matt Iulo, Founder of Scalp Micro USA"
              className="w-[130px] sm:w-[160px] shrink-0 object-cover object-top self-stretch"
              style={{ filter: "grayscale(1)" }}
            />
            <figcaption className="flex flex-col justify-between gap-6 p-6">
              <p
                className="text-[15px] leading-relaxed font-light"
                style={{ color: "var(--color-text-primary)" }}
              >
                &ldquo;I&rsquo;ve sat where you&rsquo;re sitting. This is my way of
                handing that confidence to someone who needs it — all you bring
                is your story.&rdquo;
              </p>
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
                >
                  Matt Iulo
                </p>
                <p
                  className="text-[10px] tracking-[0.18em] uppercase mt-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Founder — Scalp Micro USA
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
