import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useTheme } from '@/shared/model/useTheme'
import { ToastRegion } from '@/shared/ui/ToastRegion'
import { createQueryClient } from '@/services/queryClient'

const queryClient = createQueryClient()

function ThemeSynchronizer({ children }: PropsWithChildren) {
  useTheme()
  return children
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSynchronizer>
        {children}
        <ToastRegion />
      </ThemeSynchronizer>
    </QueryClientProvider>
  )
}
