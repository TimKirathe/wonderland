import { NextResponse } from 'next/server';

// This endpoint can be used by external monitoring services
export async function GET() {
  try {
    // Collect system status
    const status = {
      service: 'Wonderland Early Years & Prep School',
      status: 'operational',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      checks: {
        website: 'operational',
        api: 'operational',
        database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'operational' : 'not_configured',
        email: process.env.RESEND_API_KEY ? 'operational' : 'not_configured',
      },
    };

    return NextResponse.json(status, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch {
    return NextResponse.json(
      {
        service: 'Wonderland Early Years & Prep School',
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Failed to retrieve status',
      },
      { status: 503 }
    );
  }
}