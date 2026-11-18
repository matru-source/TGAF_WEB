import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Global singleton background interval to keep NeonDB compute continuously warm
declare global {
  // eslint-disable-next-line no-var
  var __neon_keepalive_timer__: NodeJS.Timeout | undefined;
}

function ensureKeepAliveTimer() {
  if (global.__neon_keepalive_timer__) return;

  // Ping every 4 minutes (Neon free computes sleep after 5 minutes of zero queries)
  global.__neon_keepalive_timer__ = setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (e) {
      console.warn("[NeonDB Keep-Alive] Warm-up query warning:", e);
    }
  }, 4 * 60 * 1000);

  // Prevent this timer from blocking Node process exit if invoked in scripts
  if (global.__neon_keepalive_timer__.unref) {
    global.__neon_keepalive_timer__.unref();
  }
}

// Start timer on module load
ensureKeepAliveTimer();

export async function GET() {
  const start = Date.now();
  try {
    ensureKeepAliveTimer();
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - start;

    return NextResponse.json(
      {
        status: "healthy",
        database: "NeonDB PostgreSQL",
        latencyMs,
        timestamp: new Date().toISOString(),
        message: "Database compute is warm and ready for fast traffic.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: err instanceof Error ? err.message : "Database ping failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
