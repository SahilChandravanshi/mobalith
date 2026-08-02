import {
  Shield,
  Gem,
  Sparkles,
  Trophy,
  ShieldAlert,
  Users,
  Crosshair,
  ListFilter,
  Activity,
  BrainCircuit,
  FlaskConical,
  Wrench,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export const navigationSections = [
  "Heroes",
  "Strategy",
  "Tools",
] as const;

export interface FeatureRoute {
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
  section: (typeof navigationSections)[number];
  nav?: boolean;
}

export const featureRoutes: FeatureRoute[] = [
  {
    path: "heroes",
    title: "Heroes",
    description: "Browse every Mobile Legends hero.",
    icon: Shield,
    section: "Heroes",
  },
  {
    path: "heroes/:slug",
    title: "Hero Details",
    description: "Hero details.",
    icon: Shield,
    section: "Heroes",
    nav: false,
  },
  {
    path: "items",
    title: "Items",
    description: "Browse all items.",
    icon: Gem,
    section: "Heroes",
  },
  {
    path: "emblems",
    title: "Emblems",
    description: "Emblem builds.",
    icon: Sparkles,
    section: "Heroes",
  },
  {
    path: "tier-lists",
    title: "Tier Lists",
    description: "Current meta rankings.",
    icon: Trophy,
    section: "Strategy",
  },
  {
    path: "counters",
    title: "Counters",
    description: "Hero counters.",
    icon: ShieldAlert,
    section: "Strategy",
  },
  {
    path: "synergy",
    title: "Synergy",
    description: "Hero synergies.",
    icon: Users,
    section: "Strategy",
  },
  {
    path: "draft-assistant",
    title: "Draft Assistant",
    description: "Draft recommendations.",
    icon: Crosshair,
    section: "Strategy",
  },
  {
    path: "compare-heroes",
    title: "Compare Heroes",
    description: "Compare heroes.",
    icon: ListFilter,
    section: "Tools",
  },
  {
    path: "meta-pulse",
    title: "Meta Pulse",
    description: "Latest meta trends.",
    icon: Activity,
    section: "Tools",
  },
  {
    path: "mobalith-intelligence",
    title: "Mobalith Intelligence",
    description: "AI-powered insights.",
    icon: BrainCircuit,
    section: "Tools",
  },
  {
    path: "labs",
    title: "Labs",
    description: "Experimental features.",
    icon: FlaskConical,
    section: "Tools",
  },
  {
    path: "builds",
    title: "Builds",
    description: "Recommended builds.",
    icon: Wrench,
    section: "Tools",
  },
  {
    path: "patch-notes",
    title: "Patch Notes",
    description: "Latest game updates.",
    icon: BookOpen,
    section: "Tools",
  },
];