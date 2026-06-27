"use client";

import { useEffect, useReducer, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitApplication } from "../lib/submitApplication";

// ─── Types ────────────────────────────────────────────────────────────────────

type PhotoKey = "front" | "top" | "back" | "side";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  cityState: string;
  hairLossStory: string;
  whyMe: string;
  photos: Record<PhotoKey, File | null>;
  consent: boolean;
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof Omit<FormData, "photos" | "consent">; value: string }
  | { type: "SET_PHOTO"; key: PhotoKey; file: File | null }
  | { type: "SET_CONSENT"; value: boolean };

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Reducer ─────────────────────────────────────────────────────────────────

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: "",
  cityState: "",
  hairLossStory: "",
  whyMe: "",
  photos: { front: null, top: null, back: null, side: null },
  consent: false,
};

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_PHOTO":
      return { ...state, photos: { ...state.photos, [action.key]: action.file } };
    case "SET_CONSENT":
      return { ...state, consent: action.value };
  }
}

// ─── Validation ──────────────────────────────────────────────────────────────

type Errors = Partial<Record<string, string>>;

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (!data.firstName.trim()) errors.firstName = "Required";
    if (!data.lastName.trim()) errors.lastName = "Required";
    if (!data.email.trim()) {
      errors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Enter a valid email";
    }
    if (!data.phone.trim()) errors.phone = "Required";
    if (!data.age.trim()) {
      errors.age = "Required";
    } else if (isNaN(Number(data.age)) || Number(data.age) < 18 || Number(data.age) > 80) {
      errors.age = "Must be 18–80";
    }
    if (!data.cityState.trim()) errors.cityState = "Required";
  }

  if (step === 2) {
    if (data.hairLossStory.trim().length < 30)
      errors.hairLossStory = "Please share a bit more — at least a few sentences";
    if (data.whyMe.trim().length < 30)
      errors.whyMe = "Please share a bit more — at least a few sentences";
  }

  if (step === 3) {
    const missing = (["front", "top", "back", "side"] as PhotoKey[]).filter(
      (k) => !data.photos[k]
    );
    if (missing.length > 0)
      errors.photos = `Please upload all 4 photos (missing: ${missing.join(", ")})`;
  }

  if (step === 4) {
    if (!data.consent) errors.consent = "You must agree to continue";
  }

  return errors;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  }),
};

// ─── Step metadata ────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Your Basics" },
  { id: 2, label: "Your Journey" },
  { id: 3, label: "Your Photos" },
  { id: 4, label: "Confirm" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [formData, dispatch] = useReducer(formReducer, initialFormData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToStep = (next: number) => {
    setDirection(next > currentStep ? 1 : -1);
    setErrors({});
    setCurrentStep(next);
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    goToStep(currentStep + 1);
  };

  const handleBack = () => goToStep(currentStep - 1);

  const handleSubmit = async () => {
    const stepErrors = validateStep(4, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitStatus("submitting");
    try {
      await submitApplication(formData);
      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
  };

  const setField = useCallback(
    (field: keyof Omit<FormData, "photos" | "consent">, value: string) =>
      dispatch({ type: "SET_FIELD", field, value }),
    []
  );

  const setPhoto = useCallback((key: PhotoKey, file: File | null) =>
    dispatch({ type: "SET_PHOTO", key, file }), []);

  if (submitStatus === "success") {
    return <SuccessScreen />;
  }

  return (
    <section
      id="apply"
      ref={sectionRef}
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
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
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Progress bar */}
            <div style={{ height: "2px", background: "var(--color-border)" }}>
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${(currentStep / STEPS.length) * 100}%`,
                  background: "var(--color-accent)",
                }}
              />
            </div>

            {/* Step tabs */}
            <div
              className="flex"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              {STEPS.map((step) => {
                const isActive = step.id === currentStep;
                const isComplete = step.id < currentStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => isComplete ? goToStep(step.id) : undefined}
                    disabled={!isComplete && !isActive}
                    className="flex-1 py-4 text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "var(--color-text-primary)"
                        : isComplete
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                      borderBottom: isActive
                        ? "2px solid var(--color-accent)"
                        : "2px solid transparent",
                      cursor: isComplete ? "pointer" : "default",
                      opacity: !isActive && !isComplete ? 0.5 : 1,
                    }}
                  >
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">{step.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated step body */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="p-8 md:p-12"
                >
                  {currentStep === 1 && (
                    <Step1
                      data={formData}
                      errors={errors}
                      setField={setField}
                      onChange={() => setErrors({})}
                    />
                  )}
                  {currentStep === 2 && (
                    <Step2
                      data={formData}
                      errors={errors}
                      setField={setField}
                      onChange={() => setErrors({})}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3
                      photos={formData.photos}
                      errors={errors}
                      setPhoto={setPhoto}
                      onChange={() => setErrors({})}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4
                      data={formData}
                      errors={errors}
                      dispatch={dispatch}
                      onChange={() => setErrors({})}
                    />
                  )}

                  {/* Navigation */}
                  <div
                    className={`flex items-center gap-4 mt-10 ${
                      currentStep === 1 ? "justify-end" : "justify-between"
                    }`}
                  >
                    {currentStep > 1 && (
                      <button
                        onClick={handleBack}
                        className="text-xs font-medium tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-50"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        ← Back
                      </button>
                    )}

                    {currentStep < 4 ? (
                      <button
                        onClick={handleNext}
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
                        Next Step →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={submitStatus === "submitting"}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200 disabled:opacity-60"
                        style={{
                          background: "var(--color-accent)",
                          color: "var(--color-text-primary)",
                          padding: "0.75rem 1.5rem",
                        }}
                        onMouseEnter={(e) => {
                          if (submitStatus !== "submitting")
                            e.currentTarget.style.background = "var(--color-accent-hover)";
                        }}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "var(--color-accent)")
                        }
                      >
                        {submitStatus === "submitting" ? "Submitting…" : "Submit Application →"}
                      </button>
                    )}
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-xs mt-4 text-right" style={{ color: "var(--color-accent)" }}>
                      Something went wrong — check your connection and try again.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Step 1 — Basics ─────────────────────────────────────────────────────────

function Step1({
  data,
  errors,
  setField,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  setField: (f: keyof Omit<FormData, "photos" | "consent">, v: string) => void;
  onChange: () => void;
}) {
  return (
    <div>
      <StepHeading>Tell us who you are.</StepHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="First Name"
          value={data.firstName}
          error={errors.firstName}
          onChange={(v) => { setField("firstName", v); onChange(); }}
        />
        <Field
          label="Last Name"
          value={data.lastName}
          error={errors.lastName}
          onChange={(v) => { setField("lastName", v); onChange(); }}
        />
        <Field
          label="Email Address"
          type="email"
          value={data.email}
          error={errors.email}
          onChange={(v) => { setField("email", v); onChange(); }}
        />
        <Field
          label="Phone Number"
          type="tel"
          value={data.phone}
          error={errors.phone}
          onChange={(v) => { setField("phone", v); onChange(); }}
        />
        <Field
          label="Age"
          type="number"
          value={data.age}
          error={errors.age}
          onChange={(v) => { setField("age", v); onChange(); }}
        />
        <Field
          label="City & State"
          value={data.cityState}
          error={errors.cityState}
          onChange={(v) => { setField("cityState", v); onChange(); }}
        />
      </div>
    </div>
  );
}

// ─── Step 2 — Journey ────────────────────────────────────────────────────────

function Step2({
  data,
  errors,
  setField,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  setField: (f: keyof Omit<FormData, "photos" | "consent">, v: string) => void;
  onChange: () => void;
}) {
  return (
    <div>
      <StepHeading>Tell us your story.</StepHeading>
      <div className="space-y-8">
        <TextArea
          label="Tell us about your hair loss journey"
          hint="When did it start? How has it affected your confidence, your relationships, your life? Be as honest as you'd like."
          value={data.hairLossStory}
          error={errors.hairLossStory}
          rows={6}
          onChange={(v) => { setField("hairLossStory", v); onChange(); }}
        />
        <TextArea
          label="Why are you the right candidate?"
          hint="What makes your story worth sharing with the world? What would this transformation mean to you?"
          value={data.whyMe}
          error={errors.whyMe}
          rows={6}
          onChange={(v) => { setField("whyMe", v); onChange(); }}
        />
      </div>
    </div>
  );
}

// ─── Step 3 — Photos ─────────────────────────────────────────────────────────

function Step3({
  photos,
  errors,
  setPhoto,
  onChange,
}: {
  photos: Record<PhotoKey, File | null>;
  errors: Errors;
  setPhoto: (k: PhotoKey, f: File | null) => void;
  onChange: () => void;
}) {
  return (
    <div>
      <StepHeading>Show us your hair.</StepHeading>
      <p
        className="text-sm font-light mb-8"
        style={{ color: "var(--color-text-muted)" }}
      >
        Upload clear photos from all four angles. Natural light works best — no
        filters, no hats. All four are required.
      </p>
      {errors.photos && (
        <p className="text-xs mb-6" style={{ color: "var(--color-accent)" }}>
          {errors.photos}
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["front", "top", "back", "side"] as PhotoKey[]).map((key) => (
          <DropZone
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            file={photos[key]}
            onFile={(f) => { setPhoto(key, f); onChange(); }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Step 4 — Confirm ────────────────────────────────────────────────────────

function Step4({
  data,
  errors,
  dispatch,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  dispatch: React.Dispatch<FormAction>;
  onChange: () => void;
}) {
  return (
    <div>
      <StepHeading>Almost there.</StepHeading>

      {/* Summary */}
      <div
        className="mb-8 p-6 grid grid-cols-2 gap-x-8 gap-y-3"
        style={{
          background: "var(--color-surface-elevated)",
          border: "1px solid var(--color-border)",
        }}
      >
        <SummaryRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow label="Email" value={data.email} />
        <SummaryRow label="Phone" value={data.phone} />
        <SummaryRow label="Location" value={data.cityState} />
        <SummaryRow label="Age" value={data.age} />
        <SummaryRow
          label="Photos"
          value={`${Object.values(data.photos).filter(Boolean).length} / 4 uploaded`}
        />
      </div>

      {/* Consent */}
      <div
        className="p-6 mb-6"
        style={{
          background: "var(--color-surface-elevated)",
          border: `1px solid ${errors.consent ? "var(--color-accent)" : "var(--color-border)"}`,
        }}
      >
        <label className="flex gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => {
              dispatch({ type: "SET_CONSENT", value: e.target.checked });
              onChange();
            }}
            className="mt-1 w-4 h-4 shrink-0"
            style={{ accentColor: "var(--color-accent)" }}
          />
          <p
            className="text-sm leading-relaxed font-light"
            style={{ color: "var(--color-text-muted)" }}
          >
            I understand that if selected, my SMP treatment will be filmed and
            photographed by Scalp Micro USA. I consent to this content being
            used across Scalp Micro USA&apos;s social media, website, and
            marketing materials in perpetuity.
          </p>
        </label>
        {errors.consent && (
          <p className="text-xs mt-3 ml-8" style={{ color: "var(--color-accent)" }}>
            {errors.consent}
          </p>
        )}
      </div>

      <p
        className="text-xs font-light"
        style={{ color: "var(--color-text-muted)" }}
      >
        By submitting you confirm all information is accurate and agree to
        Scalp Micro USA&apos;s{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-primary)" }}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-text-primary)" }}>
          Media Terms
        </a>
        .
      </p>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <section
      id="apply"
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
        background: "var(--color-bg)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-xl"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--color-accent)" }}
          >
            Application Received
          </p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Your Story<br />Is With Us.
          </h2>
          <p
            className="text-base leading-relaxed font-light mb-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Matt personally reviews every application. If your story connects,
            someone from the team will reach out directly.
          </p>
          <p
            className="text-sm font-light"
            style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Applications are reviewed on a rolling monthly basis.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Primitive components ─────────────────────────────────────────────────────

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-2xl font-bold uppercase tracking-wide mb-8"
      style={{ fontFamily: "var(--font-syne)", color: "var(--color-text-primary)" }}
    >
      {children}
    </h3>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.15em] uppercase mb-1"
        style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
        {value || "—"}
      </p>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  error,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ color: error ? "var(--color-accent)" : "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-colors duration-200"
        style={{
          border: `1px solid ${error ? "var(--color-accent)" : "var(--color-border)"}`,
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = error ? "var(--color-accent)" : "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = error ? "var(--color-accent)" : "var(--color-border)")
        }
      />
      {error && (
        <p className="text-[10px] tracking-wide" style={{ color: "var(--color-accent)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({
  label,
  hint,
  value,
  error,
  rows,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  error?: string;
  rows: number;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ color: error ? "var(--color-accent)" : "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <p
        className="text-xs font-light -mt-1 mb-1"
        style={{ color: "var(--color-text-muted)", opacity: 0.65 }}
      >
        {hint}
      </p>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none transition-colors duration-200"
        style={{
          border: `1px solid ${error ? "var(--color-accent)" : "var(--color-border)"}`,
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = error ? "var(--color-accent)" : "var(--color-border)")
        }
      />
      {error && (
        <p className="text-[10px] tracking-wide" style={{ color: "var(--color-accent)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function DropZone({
  label,
  file,
  onFile,
}: {
  label: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const preview = file ? URL.createObjectURL(file) : null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) onFile(dropped);
  };

  return (
    <div
      onClick={() => !file && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className="aspect-square flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200"
      style={{
        border: `1px dashed ${dragging ? "var(--color-accent)" : "var(--color-border)"}`,
        background: dragging ? "rgba(232,64,28,0.04)" : "var(--color-surface-elevated)",
        cursor: file ? "default" : "pointer",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />

      {preview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-2"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white mb-1">{label}</p>
            <button
              onClick={(e) => { e.stopPropagation(); onFile(null); }}
              className="text-[9px] tracking-wide uppercase hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            style={{ color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="17 8 12 3 7 8"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "var(--color-text-muted)" }}>
            {label}
          </p>
          <p className="text-[9px] mt-1" style={{ color: "var(--color-border)" }}>
            Click or drag
          </p>
        </>
      )}
    </div>
  );
}
