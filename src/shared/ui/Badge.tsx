import type { PropsWithChildren } from "react";

export type BadgeTone =
  | "brand"
  | "gold"
  | "success"
  | "muted";

interface BadgeProps extends PropsWithChildren {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand/15 text-brand border-brand/20",
  gold: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  muted: "bg-surface text-muted border-ink/10",
};

export function Badge({
  children,
  tone = "muted",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        angular-frame
        border
        px-2.5
        py-1
        text-xs
        font-semibold
        ${tones[tone]}
      `}
    >
      {children}
    </span>
  );
}