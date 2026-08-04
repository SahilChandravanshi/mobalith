export type DraftStep =
  | 'blue-ban'
  | 'red-ban'
  | 'blue-pick'
  | 'red-pick'

export const DRAFT_ORDER: DraftStep[] = [
  'blue-ban',
  'red-ban',
  'blue-ban',
  'red-ban',
  'blue-ban',
  'red-ban',

  'blue-pick',

  'red-pick',
  'red-pick',

  'blue-pick',
  'blue-pick',

  'red-pick',
  'red-pick',

  'blue-pick',
  'blue-pick',
]