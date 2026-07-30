import { Link } from 'react-router-dom'

const links = [
  { to: '/heroes', label: 'Heroes' },
  { to: '/tier-lists', label: 'Tier Lists' },
  { to: '/patch-notes', label: 'Patch Notes' },
  { to: '/strategy', label: 'Strategy Hub' },
]

export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8 pb-24 lg:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold tracking-tight">Mobalith</p>
          <p className="mt-1 text-xs text-muted">
            Master the Meta. Forge Your Victory.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              className="text-sm text-muted transition-colors hover:text-ink"
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted">Independent community companion.</p>
      </div>
    </footer>
  )
}
