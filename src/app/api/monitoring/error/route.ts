import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In production, this would send to Sentry or another monitoring service
    // For now, we'll log it server-side
    console.error('[Error Monitoring]', {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // If Sentry DSN is configured, forward to Sentry
    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (sentryDsn && process.env.NODE_ENV === 'production') {
      // This would integrate with Sentry's API
      // For now, we're just logging
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in monitoring endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to log error' },
      { status: 500 }
    );
  }
}