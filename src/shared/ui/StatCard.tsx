import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export function StatCard({
  label,
  value,
  subtext,
}: StatCardProps) {
  return (
    <Card className="text-center">
      <p className="text-xs uppercase tracking-widest text-muted">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>

      {subtext && (
        <p className="mt-1 text-xs text-muted">
          {subtext}
        </p>
      )}
    </Card>
  );
}