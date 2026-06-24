"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Cinematic background — placeholder until hero video is provided */}
      <div className="absolute inset-0 z-0">
        {/* Deep radial glow — simulates a spotlight on a dark set */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 55% 45%, #1e1a18 0%, #0d0b0a 50%, #090909 100%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Top-left accent glow */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, var(--color-accent), transparent 60%)",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-8">
        <Image
          src="/assets/images/logo-black.png"
          alt="Scalp Micro USA"
          width={140}
          height={36}
          className="invert opacity-90"
          priority
        />
        <a
          href="#apply"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-text-muted)")
          }
        >
          Apply Now
          <span style={{ color: "var(--color-accent)" }}>↗</span>
        </a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-12 pb-16 md:pb-24">
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
          className={`font-black uppercase leading-[0.9] tracking-tight mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            color: "var(--color-text-primary)",
            transitionDelay: "120ms",
          }}
        >
          Share Your<br />
          Story.<br />
          <span style={{ color: "var(--color-text-muted)", WebkitTextStroke: "1px var(--color-border)" }}>
            Transform
          </span>{" "}
          Your Life.
        </h1>

        {/* Subhead + CTA row */}
        <div
          className={`flex flex-col md:flex-row md:items-end gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "280ms" }}
        >
          <p
            className="max-w-sm text-base md:text-lg leading-relaxed font-light"
            style={{ color: "var(--color-text-muted)" }}
          >
            Submit your application for a chance to receive a fully sponsored
            SMP transformation with Matt Iulo — and share your hair loss journey
            on camera.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:gap-5 shrink-0"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-primary)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--color-accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--color-accent)")
            }
          >
            Apply Now
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-center gap-2 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
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
