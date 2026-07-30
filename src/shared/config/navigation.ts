import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Crosshair,
  Gem,
  Heart,
  ListTree,
  Shield,
  ShieldAlert,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react'

export type NavigationSection = 'Explore' | 'Tools' | 'Intelligence' | 'Library'
export type FeatureRoute = {
  path: string
  title: string
  description: string
  icon: LucideIcon
  section: NavigationSection
  nav?: boolean
}

export const featureRoutes: FeatureRoute[] = [
  {
    path: 'heroes',
    title: 'Heroes',
    description: 'Explore hero stats, roles, skills, and current performance.',
    icon: Shield,
    section: 'Explore',
  },
  {
    path: 'heroes/:heroId',
    title: 'Hero Details',
    description:
      'Inspect a hero’s abilities, matchups, builds, and live context.',
    icon: Shield,
    section: 'Explore',
    nav: false,
  },
  {
    path: 'items',
    title: 'Items',
    description: 'Find item stats, effects, and build paths.',
    icon: Gem,
    section: 'Explore',
  },
  {
    path: 'emblems',
    title: 'Emblems',
    description: 'Build talent pages that match your role and game plan.',
    icon: Sparkles,
    section: 'Explore',
  },
  {
    path: 'tier-lists',
    title: 'Tier Lists',
    description: 'Track the heroes defining the current meta.',
    icon: Trophy,
    section: 'Explore',
  },
  {
    path: 'counters',
    title: 'Counters',
    description: 'Find favorable picks and understand the matchup.',
    icon: ShieldAlert,
    section: 'Tools',
  },
  {
    path: 'synergy',
    title: 'Synergy',
    description: 'Assess how hero pairings complement a team composition.',
    icon: Users,
    section: 'Tools',
  },
  {
    path: 'draft',
    title: 'Draft Assistant',
    description: 'Plan stronger picks, bans, and team compositions.',
    icon: Crosshair,
    section: 'Tools',
  },
  {
    path: 'compare',
    title: 'Compare Heroes',
    description: 'Compare strengths, stats, and matchups side by side.',
    icon: ListTree,
    section: 'Tools',
  },
  {
    path: 'builds',
    title: 'Builds',
    description: 'Discover efficient builds for every situation.',
    icon: Swords,
    section: 'Library',
  },
  {
    path: 'patch-notes',
    title: 'Patch Notes',
    description: 'Understand balance changes and their practical impact.',
    icon: BookOpen,
    section: 'Library',
  },
  {
    path: 'strategy',
    title: 'Strategy Hub',
    description: 'Sharpen your game sense with practical guides.',
    icon: BookOpen,
    section: 'Library',
  },
  {
    path: 'favorites',
    title: 'Favorites',
    description: 'Keep your most useful heroes, builds, and tools close.',
    icon: Heart,
    section: 'Library',
  },
  {
    path: 'meta-pulse',
    title: 'Meta Pulse',
    description: 'See the signals behind the evolving meta.',
    icon: BarChart3,
    section: 'Intelligence',
  },
  {
    path: 'intelligence',
    title: 'Mobalith Intelligence',
    description: 'Rule-based insights built from transparent game data.',
    icon: BrainCircuit,
    section: 'Intelligence',
  },
  {
    path: 'labs',
    title: 'Labs',
    description: 'Try experimental analysis tools and visualizations.',
    icon: Wrench,
    section: 'Intelligence',
  },
  {
    path: 'settings',
    title: 'Settings',
    description: 'Manage your display and data preferences.',
    icon: Wrench,
    section: 'Library',
  },
]

export const navigationSections: NavigationSection[] = [
  'Explore',
  'Tools',
  'Intelligence',
  'Library',
]
