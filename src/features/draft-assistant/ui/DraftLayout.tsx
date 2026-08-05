import type { ReactNode } from 'react'

interface DraftLayoutProps {
  left: ReactNode
  center: ReactNode
  right: ReactNode
}

export function DraftLayout({
  left,
  center,
  right,
}: DraftLayoutProps) {
  return (
    <div
      className="
        grid
        gap-8
        xl:grid-cols-[180px_minmax(0,1fr)_180px]
        items-start
      "
    >
      <aside>{left}</aside>

      <main className="min-w-0">
        {center}
      </main>

      <aside>{right}</aside>
    </div>
  )
}