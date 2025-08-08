import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  private getClientIdentifier(req: NextRequest): string {
    // Try to get IP from various headers
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // Include user agent for better fingerprinting
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    return `${ip}-${userAgent}`;
  }

  async checkLimit(req: NextRequest): Promise<{ allowed: boolean; retryAfter?: number }> {
    const identifier = this.getClientIdentifier(req);
    const now = Date.now();

    if (!this.store[identifier] || this.store[identifier].resetTime < now) {
      // New window for this client
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return { allowed: true };
    }

    // Existing window
    const client = this.store[identifier];
    
    if (client.count >= this.maxRequests) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((client.resetTime - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment count
    client.count++;
    return { allowed: true };
  }
}

// Create rate limiters with different configurations
export const contactRateLimiter = new RateLimiter(60000, 5); // 5 requests per minute
export const inquiryRateLimiter = new RateLimiter(60000, 3); // 3 requests per minute

export async function withRateLimit(
  req: NextRequest,
  limiter: RateLimiter,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const { allowed, retryAfter } = await limiter.checkLimit(req);

  if (!allowed) {
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter: `${retryAfter} seconds`
      },
      { 
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + (retryAfter || 0) * 1000).toISOString()
        }
      }
    );
  }

  return handler();
}