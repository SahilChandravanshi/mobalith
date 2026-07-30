import type { DataEntity, EntityId } from '@/types'

export function indexById<T extends DataEntity>(
  entities: readonly T[],
): Record<EntityId, T> {
  return Object.fromEntries(entities.map((entity) => [entity.id, entity]))
}
export function upsertById<T extends DataEntity>(
  entities: readonly T[],
  incoming: T,
): T[] {
  const index = entities.findIndex((entity) => entity.id === incoming.id)
  return index === -1
    ? [...entities, incoming]
    : entities.map((entity) => (entity.id === incoming.id ? incoming : entity))
}
