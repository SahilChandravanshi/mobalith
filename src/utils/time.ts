export const isExpired = (expiresAt: number, now = Date.now()) =>
  now >= expiresAt
