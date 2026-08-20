export type IconName = "attorney" | "adjuster" | "unsure" | "check";

function Attorney() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12.5" y1="26" x2="27.5" y2="14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12.5" cy="26" r="2.1" fill="currentColor" />
      <circle cx="27.5" cy="14" r="2.1" fill="currentColor" />
    </svg>
  );
}

function Unsure() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16.5" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="20,10.5 23.2,20 20,29.5 16.8,20" fill="currentColor" />
    </svg>
  );
}

function Adjuster() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M13 20.5l4.5 4.5L27 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons: Record<IconName, () => React.ReactElement> = {
  attorney: Attorney,
  adjuster: Adjuster,
  unsure: Unsure,
  check: Adjuster,
};

export default function PIcon({ name, className = "picon" }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return (
    <div className={className}>
      <Icon />
    </div>
  );
}
