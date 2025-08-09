import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log performance metrics
    console.log('[Performance Monitoring]', {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // In production, you could send this to a monitoring service
    // or store in a database for analysis
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in performance monitoring endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to log performance metrics' },
      { status: 500 }
    );
  }
}