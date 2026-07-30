import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & { to?: string; variant?: ButtonVariant }

const baseClassName =
  'inline-flex items-center justify-center gap-2 rounded-control px-4 py-2.5 text-sm font-bold transition-all duration-150 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50'
const variants: Record<ButtonVariant, string> = {
  primary: 'border border-brand/40 bg-brand text-white shadow-glow',
  secondary: 'border border-ink/15 bg-surface text-ink hover:bg-elevated',
  ghost: 'text-muted hover:bg-elevated hover:text-ink',
  danger: 'bg-danger text-white',
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
