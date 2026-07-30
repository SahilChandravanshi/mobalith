import { AlertTriangle, Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'

export function EmptyState({
  title,
  description,
  to,
  action,
}: {
  title: string
  description: string
  to?: string
  action?: string
}) {
  return (
    <div className="rounded-control border border-dashed border-ink/15 bg-inset/50 px-5 py-8 text-center">
      <Inbox className="mx-auto text-muted" size={24} />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted">
        {description}
      </p>
      {to && action && (
        <Link
          className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
          to={to}
        >
          {action}
        </Link>
      )}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: {
  title?: string
  description: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-control border border-danger/20 bg-danger/5 px-5 py-6 text-center">
      <AlertTriangle className="mx-auto text-danger" size={22} />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      {onRetry && (
        <button
          className="mt-4 text-sm font-semibold text-brand hover:underline"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-control bg-elevated ${className}`}
    />
  )
}
