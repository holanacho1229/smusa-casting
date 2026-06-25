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
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 55% 45%, #1e1a18 0%, #0d0b0a 50%, #090909 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
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

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between pt-8"
        style={{ paddingLeft: px, paddingRight: px }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-medium"
          style={{ color: "var(--color-text-muted)" }}
        >
          Scalp Micro USA
        </span>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
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
          <span
            style={{
              WebkitTextStroke: "1.5px var(--color-accent)",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
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
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 z-10 flex flex-col items-center gap-2 transition-all duration-700 ${
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
        <div
          className="w-px h-12"
          style={{ background: "var(--color-border)" }}
        />
      </div>
    </section>
  );
}
