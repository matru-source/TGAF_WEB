// In-memory sliding-window rate limiter for brute-force protection

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

// Global store attached to globalThis so it persists across Next.js dev reloads
const globalStore = globalThis as unknown as {
  __authRateLimitStore?: Map<string, RateLimitRecord>;
};

if (!globalStore.__authRateLimitStore) {
  globalStore.__authRateLimitStore = new Map<string, RateLimitRecord>();
}

const store = globalStore.__authRateLimitStore;

// Clean up expired records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  error?: string;
}

/** Extract client IP from common proxy headers */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "127.0.0.1";
}

/** Check if the identifier (e.g. `ip:email`) is currently rate-limited */
export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    return {
      allowed: true,
      remaining: maxAttempts,
      retryAfterSeconds: 0,
    };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
      error: `Too many failed attempts. Account access is temporarily locked. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    retryAfterSeconds: 0,
  };
}

/** Record a failed attempt */
export function recordFailedAttempt(
  key: string,
  windowMs = 15 * 60 * 1000,
): number {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }

  record.count += 1;
  store.set(key, record);
  return record.count;
}

/** Clear failed attempts upon successful login */
export function resetRateLimit(key: string): void {
  store.delete(key);
}
