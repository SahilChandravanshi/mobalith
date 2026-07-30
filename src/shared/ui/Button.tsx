import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & { to?: string; variant?: ButtonVariant }

const baseClassName =
  'angular-frame inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50'
const variants: Record<ButtonVariant, string> = {
  primary: 'border border-brand/50 bg-brand text-white hover:shadow-glow',
  secondary:
    'border border-ink/15 bg-surface text-ink hover:border-ink/25 hover:bg-elevated',
  ghost: 'text-muted hover:bg-elevated hover:text-ink',
  danger: 'border border-danger/50 bg-danger text-white hover:shadow-glow',
}

export function Button({
  to,
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = `${baseClassName} ${variants[variant]} ${className ?? ''}`
  if (to)
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}
