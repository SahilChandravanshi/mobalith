import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'
import type { Favorite, FavoriteTargetType } from '@/types'

type FavoritesState = {
  favorites: Favorite[]
  toggle: (type: FavoriteTargetType, id: string) => void
  has: (type: FavoriteTargetType, id: string) => boolean
  clear: () => void
}
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (type, id) => {
        const existing = get().favorites.some(
          (favorite) => favorite.type === type && favorite.id === id,
        )
        set((state) => ({
          favorites: existing
            ? state.favorites.filter(
                (favorite) => favorite.type !== type || favorite.id !== id,
              )
            : [
                ...state.favorites,
                { type, id, savedAt: new Date().toISOString() },
              ],
        }))
      },
      has: (type, id) =>
        get().favorites.some(
          (favorite) => favorite.type === type && favorite.id === id,
        ),
      clear: () => set({ favorites: [] }),
    }),
    { name: `${APP_STORAGE_PREFIX}-favorites` },
  ),
)
