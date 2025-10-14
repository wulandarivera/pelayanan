import { NextRequest, NextResponse } from 'next/server';
import { DocumentModel } from '@/lib/models/document';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kelurahanId = searchParams.get('kelurahan_id');

    // Get stats from database
    const stats = await DocumentModel.getStats(
      kelurahanId ? parseInt(kelurahanId) : undefined
    );

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
