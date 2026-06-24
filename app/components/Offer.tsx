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
      className="px-6 md:px-12"
      style={{
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--color-accent)" }}
          >
            The Exchange
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="font-black uppercase leading-[0.9] tracking-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: "var(--color-text-primary)",
              }}
            >
              The Documentary<br />Project.
            </h2>
            <p
              className="max-w-sm text-base leading-relaxed font-light md:text-right"
              style={{ color: "var(--color-text-muted)" }}
            >
              We are looking for real stories. In exchange for documenting your
              hair loss journey and treatment on camera, we are fully sponsoring
              select SMP transformations. New stories are selected every month.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full mb-20 opacity-20"
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
