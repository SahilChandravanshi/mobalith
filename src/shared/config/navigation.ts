import {
  Shield,
  Gem,
  Sparkles,
  Trophy,
  ShieldAlert,
  Users,
  Crosshair,
  Scale,
  Activity,
  BrainCircuit,
  FlaskConical,
  Wrench,
  BookOpen,
  WandSparkles ,
  type LucideIcon,
} from 'lucide-react'

export const navigationSections = [
  'Heroes',
  'Strategy',
  'Game Data',
  'Utilities',
  'About',
] as const

export interface FeatureRoute {
  path: string
  title: string
  description: string
  icon: LucideIcon
  section: (typeof navigationSections)[number]
  nav?: boolean
}

export const featureRoutes: FeatureRoute[] = [
  // ---------------- HEROES ----------------

  {
    path: 'heroes',
    title: 'Heroes',
    description: 'Browse every Mobile Legends hero.',
    icon: Shield,
    section: 'Heroes',
  },
  {
    path: 'heroes/:slug',
    title: 'Hero Details',
    description: 'Hero details.',
    icon: Shield,
    section: 'Heroes',
    nav: false,
  },

  // ---------------- GAME DATA ----------------

  {
    path: 'items',
    title: 'Items',
    description: 'Browse all items.',
    icon: Gem,
    section: 'Game Data',
  },
  {
    path: 'emblems',
    title: 'Emblems',
    description: 'Emblem builds.',
    icon: Sparkles,
    section: 'Game Data',
  },
  {
    path: 'battle-spells',
    title: 'Battle Spells',
    description: 'Browse all battle spells.',
    icon: WandSparkles ,
    section: 'Game Data',
  },
  {
    path: 'patch-notes',
    title: 'Patch Notes',
    description: 'Latest game updates.',
    icon: BookOpen,
    section: 'Game Data',
  },

  // ---------------- STRATEGY ----------------

  {
    path: 'tier-lists',
    title: 'Tier Lists',
    description: 'Current meta rankings.',
    icon: Trophy,
    section: 'Strategy',
  },
  {
    path: 'counters',
    title: 'Counters',
    description: 'Hero counters.',
    icon: ShieldAlert,
    section: 'Strategy',
  },
  {
    path: 'synergy',
    title: 'Synergy',
    description: 'Hero synergies.',
    icon: Users,
    section: 'Strategy',
  },
  {
    path: 'draft-assistant',
    title: 'Draft Assistant',
    description: 'Draft recommendations.',
    icon: Crosshair,
    section: 'Strategy',
  },

  // ---------------- UTILITIES ----------------
  {
    path: 'builds',
    title: 'Builds',
    description: 'Recommended builds.',
    icon: Wrench,
    section: 'Utilities',
  },
  {
    path: 'compare-heroes',
    title: 'Versus',
    description: 'Compare heroes.',
    icon: Scale,
    section: 'Utilities',
  },
  {
    path: 'meta-pulse',
    title: 'Meta Pulse',
    description: 'Latest meta trends.',
    icon: Activity,
    section: 'Utilities',
  },
  {
    path: 'mobalith-intelligence',
    title: 'Mobalith AI',
    description: 'AI-powered insights.',
    icon: BrainCircuit,
    section: 'Utilities',
  },
  {
    path: 'labs',
    title: 'Labs',
    description: 'Experimental features.',
    icon: FlaskConical,
    section: 'Utilities',
  },
]
