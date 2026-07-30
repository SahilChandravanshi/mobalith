import type { PropsWithChildren, ReactNode } from 'react'

type CardProps = PropsWithChildren<{
  title?: string
  action?: ReactNode
  className?: string
}>

export function Card({ title, action, className = '', children }: CardProps) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
