import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: ReactNode
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  )
}
