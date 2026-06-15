import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Default mock for when Redis is not configured (e.g., local dev without Upstash)
const mockRedis = {
  sadd: async () => 1,
  hset: async () => 1,
  hget: async () => null,
  expire: async () => 1,
  zadd: async () => 1,
  zrange: async () => [],
  zremrangebyscore: async () => 1,
  zcard: async () => 0,
  eval: async () => [0, 0, 0, 0], // Minimal mock for rate limiter lua scripts
} as any

const isRedisConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
const redis = isRedisConfigured ? Redis.fromEnv() : mockRedis

// Strict rate limiter for authentication endpoints (e.g., 5 requests per 5 minutes)
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/auth",
})

// Moderate rate limiter for form submissions (e.g., 10 requests per 10 minutes)
export const formRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/form",
})

// General rate limiter for standard public API endpoints (e.g., 100 requests per 1 minute)
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/api",
})

export async function checkRateLimit(ip: string, limiter: Ratelimit) {
  if (!isRedisConfigured) return { success: true } // Bypass if no Redis URL provided
  
  const { success, pending, limit, reset, remaining } = await limiter.limit(ip)
  return { success, limit, reset, remaining }
}
