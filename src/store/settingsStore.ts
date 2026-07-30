import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP_STORAGE_PREFIX } from '@/data/constants'

export type Settings = {
  dataRefreshEnabled: boolean
  offlineCacheEnabled: boolean
  compactData: boolean
}
type SettingsState = Settings & {
  update: (settings: Partial<Settings>) => void
  reset: () => void
}
const defaults: Settings = {
  dataRefreshEnabled: true,
  offlineCacheEnabled: true,
  compactData: false,
}
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      update: (settings) => set(settings),
      reset: () => set(defaults),
    }),
    { name: `${APP_STORAGE_PREFIX}-settings` },
  ),
)
