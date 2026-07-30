import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'
import type { Patch } from '@/types'
import { upsertById } from '@/utils/collections'

type PatchState = {
  patches: Patch[]
  hydratedAt?: string
  setPatches: (patches: Patch[]) => void
  upsertPatch: (patch: Patch) => void
  clear: () => void
}
export const usePatchStore = create<PatchState>()(
  persist(
    (set) => ({
      patches: [],
      setPatches: (patches) =>
        set({ patches, hydratedAt: new Date().toISOString() }),
      upsertPatch: (patch) =>
        set((state) => ({
          patches: upsertById(state.patches, patch),
          hydratedAt: new Date().toISOString(),
        })),
      clear: () => set({ patches: [], hydratedAt: undefined }),
    }),
    { name: `${APP_STORAGE_PREFIX}-patches` },
  ),
)
