export const queryKeys = {
  heroes: {
    all: ['heroes'] as const,
    detail: (id: string) => ['heroes', id] as const,
  },
  items: {
    all: ['items'] as const,
    detail: (id: string) => ['items', id] as const,
  },
  patches: {
    all: ['patches'] as const,
    latest: ['patches', 'latest'] as const,
  },
  builds: {
    all: ['builds'] as const,
    detail: (id: string) => ['builds', id] as const,
  },
} as const
