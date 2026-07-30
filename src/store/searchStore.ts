import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'
import { SearchScope } from '@/types'

type SearchState = {
  query: string
  scope: SearchScope
  recentQueries: string[]
  setQuery: (query: string) => void
  setScope: (scope: SearchScope) => void
  commitQuery: () => void
  clear: () => void
}
export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      scope: SearchScope.All,
      recentQueries: [],
      setQuery: (query) => set({ query }),
      setScope: (scope) => set({ scope }),
      commitQuery: () => {
        const query = get().query.trim()
        if (!query) return
        set((state) => ({
          recentQueries: [
            query,
            ...state.recentQueries.filter((entry) => entry !== query),
          ].slice(0, 8),
        }))
      },
      clear: () => set({ query: '', recentQueries: [] }),
    }),
    {
      name: `${APP_STORAGE_PREFIX}-search`,
      partialize: (state) => ({
        scope: state.scope,
        recentQueries: state.recentQueries,
      }),
    },
  ),
)
