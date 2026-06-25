export default function SectionDivider() {
  return (
    <div className="flex w-full" aria-hidden="true">
      <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
      <div style={{ width: "40px", height: "1px", background: "var(--color-accent)" }} />
    </div>
  );
}
