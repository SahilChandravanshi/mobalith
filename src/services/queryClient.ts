import { QueryClient } from '@tanstack/react-query'
import { QUERY_GC_TIME_MS, QUERY_STALE_TIME_MS } from '@/data/constants'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME_MS,
        gcTime: QUERY_GC_TIME_MS,
        retry: 1,
        refetchOnWindowFocus: false,
        networkMode: 'offlineFirst',
      },
      mutations: { networkMode: 'offlineFirst', retry: 1 },
    },
  })
}
