export const rateLimitFragment = `fragment rateLimit on Query {
  rateLimit {
    cost,
    limit,
    remaining,
    resetAt
  }
}`
