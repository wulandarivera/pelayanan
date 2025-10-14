import { NextRequest, NextResponse } from 'next/server';
import { DocumentModel } from '@/lib/models/document';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kelurahanId = searchParams.get('kelurahan_id');
    const limit = searchParams.get('limit') || '10';

    // Get recent documents from database
    const documents = await DocumentModel.getRecent(
      parseInt(limit),
      kelurahanId ? parseInt(kelurahanId) : undefined
    );

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error('Error fetching recent documents:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
