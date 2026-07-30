import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useTheme } from '@/shared/model/useTheme'
import { ToastRegion } from '@/shared/ui/ToastRegion'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

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
