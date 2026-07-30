import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light' | 'system'
type ThemeState = { theme: Theme; setTheme: (theme: Theme) => void }

const resolveTheme = (theme: Theme) =>
  theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : theme

const useThemeStore = create<ThemeState>()(
  persist((set) => ({ theme: 'dark', setTheme: (theme) => set({ theme }) }), {
    name: 'mobalith-preferences',
  }),
)

export function useTheme() {
  const { theme, setTheme } = useThemeStore()
  useEffect(() => {
    const applyTheme = () =>
      document.documentElement.classList.toggle(
        'dark',
        resolveTheme(theme) === 'dark',
      )
    applyTheme()
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [theme])
  return { theme, setTheme }
}
