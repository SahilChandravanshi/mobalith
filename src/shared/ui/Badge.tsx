import type { PropsWithChildren } from 'react'

type BadgeTone = 'brand' | 'gold' | 'success' | 'muted'
type BadgeProps = PropsWithChildren<{ tone?: BadgeTone }>

const tones: Record<BadgeTone, string> = {
  brand: 'border-brand/20 bg-brand/10 text-brand',
  gold: 'border-gold/20 bg-gold/10 text-gold',
  success: 'border-success/20 bg-success/10 text-success',
  muted: 'border-ink/10 bg-elevated text-muted',
}

export function Badge({ tone = 'muted', children }: BadgeProps) {
  return (
    <span
      className={`angular-frame inline-flex items-center border px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
