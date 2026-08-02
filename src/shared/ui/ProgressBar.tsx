interface ProgressBarProps {
  value: number;
  max?: number;
}

export function ProgressBar({
  value,
  max = 10,
}: ProgressBarProps) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100)
  );

  return (
    <div className="h-2 overflow-hidden rounded-full bg-elevated">
      <div
        className="h-full bg-brand transition-all duration-500"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}