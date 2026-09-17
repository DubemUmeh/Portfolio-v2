interface RateLimitOptions {
  interval: number; // Interval window in milliseconds
  uniqueTokenPerInterval: number; // Max number of unique tokens per interval
}

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const trackers = new Map<string, RateLimitTracker>();

/**
 * Basic in-memory rate limiter using sliding window / token bucket per IP/identifier.
 */
export function rateLimit(options: RateLimitOptions) {
  const interval = options.interval;
  const limit = options.uniqueTokenPerInterval;

  return {
    check: (identifier: string): { success: boolean; limit: number; remaining: number; reset: number } => {
      const now = Date.now();
      const tracker = trackers.get(identifier);

      // Clean up expired entry if necessary
      if (!tracker || now > tracker.resetTime) {
        const resetTime = now + interval;
        trackers.set(identifier, { count: 1, resetTime });
        return { success: true, limit, remaining: limit - 1, reset: resetTime };
      }

      if (tracker.count >= limit) {
        return { success: false, limit, remaining: 0, reset: tracker.resetTime };
      }

      tracker.count += 1;
      return { success: true, limit, remaining: limit - tracker.count, reset: tracker.resetTime };
    },
  };
}
