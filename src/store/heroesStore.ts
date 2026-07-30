import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'
import type { Hero } from '@/types'
import { upsertById } from '@/utils/collections'

type HeroesState = {
  heroes: Hero[]
  hydratedAt?: string
  setHeroes: (heroes: Hero[]) => void
  upsertHero: (hero: Hero) => void
  clear: () => void
}
export const useHeroesStore = create<HeroesState>()(
  persist(
    (set) => ({
      heroes: [],
      setHeroes: (heroes) =>
        set({ heroes, hydratedAt: new Date().toISOString() }),
      upsertHero: (hero) =>
        set((state) => ({
          heroes: upsertById(state.heroes, hero),
          hydratedAt: new Date().toISOString(),
        })),
      clear: () => set({ heroes: [], hydratedAt: undefined }),
    }),
    { name: `${APP_STORAGE_PREFIX}-heroes` },
  ),
)
