export default function throttleConfig() {
  return {
    rateLimit: {
      ttl: process.env.THROTTLE_TTL,
      limit: process.env.THROTTLE_LIMIT
    }
  }
};