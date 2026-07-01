"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Apply",
    description:
      "Submit your story, photos, and why you're the right candidate. No experience needed — just honesty.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="3" width="16" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="21" cy="21" r="5" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="21" y1="19" x2="21" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="21" x2="23" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Get Selected",
    description:
      "Matt personally reviews applications each month and selects candidates whose stories connect.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="9,14 12.5,17.5 19,11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Film & Transform",
    description:
      "Receive your fully sponsored SMP treatment. Your journey — before, during, and after — is documented for the world.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="19,11 25,8 25,20 19,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
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
              The Offer — How It Works
            </span>
            <span
              className="text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              01 <span style={{ opacity: 0.4 }}>/ 03</span>
            </span>
          </div>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            The SMP Documentary<br />Project.
          </h2>
          <p
            className="leading-relaxed font-light"
            style={{
              color: "rgba(240,237,230,0.72)",
              maxWidth: "54ch",
              fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)",
            }}
          >
            Each month, we{" "}
            <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
              fully sponsor SMP treatments
            </span>{" "}
            for a select few — at no cost to you. In return, you let us{" "}
            <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
              film your journey on camera
            </span>
            , before and after. Your story shows others living with hair loss
            what&apos;s possible.
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full mb-14 opacity-20"
          style={{ height: "1px", background: "var(--color-text-muted)" }}
        />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-border)" }}>
          {steps.map((step, i) => (
            <div
              key={step.label}
              className={`p-10 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "var(--color-bg)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="mb-8"
                style={{ color: "var(--color-accent)" }}
              >
                {step.icon}
              </div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--color-text-muted)" }}
              >
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="text-xl font-bold mb-4 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
              >
                {step.label}
              </h3>
              <p
                className="text-sm leading-relaxed font-light"
                style={{ color: "var(--color-text-muted)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
