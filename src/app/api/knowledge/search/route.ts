import { NextRequest, NextResponse } from 'next/server'

import { knowledgeMetadata } from '@/content/knowledge'
import { searchKnowledge } from '@/lib/knowledge-search'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''

  if (query.length > 120) {
    return NextResponse.json(
      { error: 'Die Suchanfrage darf höchstens 120 Zeichen lang sein.' },
      { status: 400 },
    )
  }

  return NextResponse.json({
    query,
    knowledgeVersion: knowledgeMetadata.version,
    results: searchKnowledge(query),
  })
}
