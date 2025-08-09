import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const checks: Record<string, { status: string; responseTime?: number; error?: string }> = {};

  // Check basic health
  checks.api = {
    status: 'healthy',
    responseTime: Date.now() - startTime,
  };

  // Check database connection if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const dbStartTime = Date.now();
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from('reviews').select('id').limit(1);
      
      if (error) {
        checks.database = {
          status: 'unhealthy',
          error: error.message,
          responseTime: Date.now() - dbStartTime,
        };
      } else {
        checks.database = {
          status: 'healthy',
          responseTime: Date.now() - dbStartTime,
        };
      }
    } catch (error) {
      checks.database = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - dbStartTime,
      };
    }
  } else {
    checks.database = {
      status: 'not_configured',
    };
  }

  // Overall health status
  const allHealthy = Object.values(checks).every(
    (check) => check.status === 'healthy' || check.status === 'not_configured'
  );

  const response = {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
    environment: process.env.NODE_ENV,
  };

  return NextResponse.json(response, {
    status: allHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}