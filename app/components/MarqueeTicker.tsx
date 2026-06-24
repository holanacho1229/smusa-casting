export default function MarqueeTicker() {
  const items = [
    "Your Story",
    "Filmed",
    "Shared",
    "Transformed",
    "Your Story",
    "Filmed",
    "Shared",
    "Transformed",
    "Your Story",
    "Filmed",
    "Shared",
    "Transformed",
    "Your Story",
    "Filmed",
    "Shared",
    "Transformed",
  ];

  return (
    <div
      className="overflow-hidden py-3 select-none"
      style={{ background: "var(--color-accent)" }}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-[0.2em] uppercase mx-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            {item}
            <span className="mx-6 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
