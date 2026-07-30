import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Crosshair,
  Gem,
  Search,
  Shield,
  Sparkles,
  Swords,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { EmptyState } from '@/shared/ui/FeedbackStates'
import { Footer } from '@/shared/ui/Footer'
import { Input } from '@/shared/ui/Input'

const quickLinks = [
  {
    to: '/heroes',
    label: 'Heroes',
    detail: 'Explore every hero',
    icon: Shield,
  },
  {
    to: '/builds',
    label: 'Builds',
    detail: 'Find your next build',
    icon: Swords,
  },
  {
    to: '/tier-lists',
    label: 'Tier Lists',
    detail: 'Read the current meta',
    icon: Trophy,
  },
  {
    to: '/draft',
    label: 'Draft Assistant',
    detail: 'Plan stronger picks',
    icon: Crosshair,
  },
  {
    to: '/emblems',
    label: 'Emblems',
    detail: 'Refine your setup',
    icon: Sparkles,
  },
  { to: '/items', label: 'Items', detail: 'Browse item effects', icon: Gem },
]

export function DashboardPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(
      `/heroes${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`,
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <section className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-brand/20 bg-gradient-to-br from-brand/25 via-surface to-cyan/10 px-5 py-10 shadow-panel sm:px-9 sm:py-14">
          <div className="absolute -right-12 -top-16 size-64 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <Badge tone="gold">Mobalith intelligence</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Master the meta.
              <br />
              Forge your victory.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
              A precise, lightweight Mobile Legends companion for player
              decisions that matter — before, during, and between matches.
            </p>
            <form className="mt-7 max-w-xl" onSubmit={search}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  aria-label="Search heroes, builds, and guides"
                  icon="search"
                  name="search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search heroes, builds, and guides"
                  value={query}
                />
                <Button type="submit">
                  <Search size={17} />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
        <section className="mt-10">
          <div className="mb-4">
            <p className="eyebrow">Start here</p>
            <h2 className="section-title mt-1">Quick navigation</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map(({ to, label, detail, icon: Icon }) => (
              <a
                key={to}
                href={`#${to}`}
                className="group flex items-center gap-4 rounded-control border border-ink/10 bg-surface p-4 shadow-panel transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-control bg-brand/10 text-brand">
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {detail}
                  </span>
                </span>
                <ChevronRight
                  className="text-muted transition-transform group-hover:translate-x-0.5"
                  size={18}
                />
              </a>
            ))}
          </div>
        </section>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card
            title="Featured heroes"
            action={<Badge tone="brand">Discover</Badge>}
          >
            <EmptyState
              title="Hero insights will appear here"
              description="Browse the full hero directory to begin finding role, matchup, and build guidance."
              to="/heroes"
              action="Explore heroes"
            />
          </Card>
          <Card
            title="Current meta"
            action={<TrendingUp className="text-cyan" size={19} />}
          >
            <EmptyState
              title="Meta data is awaiting its next update"
              description="Tier and performance signals will be presented here as soon as the data source is connected."
              to="/meta-pulse"
              action="Open Meta Pulse"
            />
          </Card>
          <Card
            title="Latest patch"
            action={<Badge tone="gold">Patch notes</Badge>}
          >
            <p className="text-sm leading-6 text-muted">
              Patch changes are organized for fast scanning, with practical
              context alongside each balance update.
            </p>
            <Button className="mt-5" to="/patch-notes">
              Read patch notes <ArrowRight size={16} />
            </Button>
          </Card>
          <Card
            title="Trending builds"
            action={<Swords className="text-gold" size={19} />}
          >
            <EmptyState
              title="Build trends will appear here"
              description="Use the builds library to prepare your preferred item and emblem paths."
              to="/builds"
              action="Browse builds"
            />
          </Card>
        </div>
        <section className="mt-10">
          <div className="mb-4">
            <p className="eyebrow">Strategy Hub</p>
            <h2 className="section-title mt-1">Latest articles</h2>
          </div>
          <Card>
            <EmptyState
              title="No articles published yet"
              description="The Strategy Hub will collect concise guides and practical game knowledge here."
              to="/strategy"
              action="Visit Strategy Hub"
            />
          </Card>
        </section>
      </section>
      <div className="mt-14">
        <Footer />
      </div>
    </motion.div>
  )
}
