import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'
import type { Item } from '@/types'
import { upsertById } from '@/utils/collections'

type ItemsState = {
  items: Item[]
  hydratedAt?: string
  setItems: (items: Item[]) => void
  upsertItem: (item: Item) => void
  clear: () => void
}
export const useItemsStore = create<ItemsState>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items, hydratedAt: new Date().toISOString() }),
      upsertItem: (item) =>
        set((state) => ({
          items: upsertById(state.items, item),
          hydratedAt: new Date().toISOString(),
        })),
      clear: () => set({ items: [], hydratedAt: undefined }),
    }),
    { name: `${APP_STORAGE_PREFIX}-items` },
  ),
)
