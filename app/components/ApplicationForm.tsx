"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { id: 1, label: "Your Basics" },
  { id: 2, label: "Your Journey" },
  { id: 3, label: "Your Photos" },
  { id: 4, label: "Confirm" },
];

export default function ApplicationForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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
      id="apply"
      ref={ref}
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-bg)",
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
            Ready to Apply?
          </p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Submit Your<br />Application.
          </h2>
        </div>

        {/* Form card */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div
            className="rounded-sm overflow-hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Progress bar */}
            <div
              className="h-1 transition-all duration-500"
              style={{
                background: "var(--color-border)",
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                  background: "var(--color-accent)",
                }}
              />
            </div>

            {/* Step indicators */}
            <div
              className="flex border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={`flex-1 py-4 text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                    step.id < currentStep ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{
                    color:
                      step.id === currentStep
                        ? "var(--color-text-primary)"
                        : step.id < currentStep
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                    borderBottom:
                      step.id === currentStep
                        ? "2px solid var(--color-accent)"
                        : "2px solid transparent",
                  }}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.id}</span>
                </button>
              ))}
            </div>

            {/* Form body */}
            <div className="p-8 md:p-12">
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3
                    className="text-2xl font-bold uppercase tracking-wide mb-8"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
                  >
                    Tell us who you are.
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {["First Name", "Last Name"].map((label) => (
                      <FormField key={label} label={label} type="text" />
                    ))}
                    <FormField label="Email Address" type="email" />
                    <FormField label="Phone Number" type="tel" />
                    <FormField label="Age" type="number" />
                    <FormField label="City & State" type="text" />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3
                    className="text-2xl font-bold uppercase tracking-wide mb-8"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
                  >
                    Tell us your story.
                  </h3>
                  <FormTextArea
                    label="Tell us about your hair loss journey"
                    hint="When did it start? How has it affected you? Be as honest as you'd like."
                    rows={5}
                  />
                  <FormTextArea
                    label="Why are you the perfect candidate?"
                    hint="What makes your story worth sharing with the world?"
                    rows={5}
                  />
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div>
                  <h3
                    className="text-2xl font-bold uppercase tracking-wide mb-2"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
                  >
                    Show us your hair.
                  </h3>
                  <p
                    className="text-sm mb-8 font-light"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Upload clear photos of your current hair loss condition. Good lighting helps — natural light works best.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Front", "Top", "Back", "Side"].map((angle) => (
                      <DropZone key={angle} label={angle} />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div>
                  <h3
                    className="text-2xl font-bold uppercase tracking-wide mb-8"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
                  >
                    Almost there.
                  </h3>
                  <div
                    className="p-6 rounded-sm mb-8"
                    style={{
                      background: "var(--color-surface-elevated)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <label className="flex gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 shrink-0 accent-[var(--color-accent)]"
                      />
                      <p
                        className="text-sm leading-relaxed font-light"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        I understand and agree that if selected, my SMP treatment
                        will be filmed and photographed by Scalp Micro USA. I
                        consent to this content being used across Scalp Micro
                        USA&apos;s social media channels, website, and marketing
                        materials in perpetuity.
                      </p>
                    </label>
                  </div>
                  <p
                    className="text-xs mb-8 font-light"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    By submitting, you confirm all information is accurate and agree to
                    Scalp Micro USA&apos;s{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Media Terms &amp; Conditions
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className={`flex items-center gap-4 mt-10 ${currentStep === 1 ? "justify-end" : "justify-between"}`}>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:opacity-70"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    ← Back
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:gap-5"
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
                    Next Step →
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:gap-5"
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
                    Submit Application →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, type }: { label: string; type: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-colors duration-200"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-border)")
        }
      />
    </div>
  );
}

function FormTextArea({
  label,
  hint,
  rows,
}: {
  label: string;
  hint: string;
  rows: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <p
        className="text-xs font-light -mt-1 mb-1"
        style={{ color: "var(--color-text-muted)", opacity: 0.7 }}
      >
        {hint}
      </p>
      <textarea
        rows={rows}
        className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none transition-colors duration-200"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-border)")
        }
      />
    </div>
  );
}

function DropZone({ label }: { label: string }) {
  return (
    <div
      className="aspect-square flex flex-col items-center justify-center gap-2 rounded-sm cursor-pointer transition-colors duration-200 group"
      style={{
        border: "1px dashed var(--color-border)",
        background: "var(--color-surface-elevated)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-accent)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-border)")
      }
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="transition-colors duration-200"
        style={{ color: "var(--color-text-muted)" }}
      >
        <path
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polyline
          points="17 8 12 3 7 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12"
          y1="3"
          x2="12"
          y2="15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p
        className="text-[10px] tracking-[0.15em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </p>
      <p
        className="text-[9px]"
        style={{ color: "var(--color-border)" }}
      >
        Click to upload
      </p>
    </div>
  );
}
