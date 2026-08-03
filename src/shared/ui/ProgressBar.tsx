interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
}

export function ProgressBar({
  value,
  max = 10,
  color,
}: ProgressBarProps) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100)
  );

  return (
    <div
      className="
        angular-frame
        h-3
        overflow-hidden
        border
        border-ink/10
        bg-inset
      "
    >
      <div
        className="h-full transition-all duration-700 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color ?? "rgb(var(--color-brand))",
        }}
      />
    </div>
  );
}