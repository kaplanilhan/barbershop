import { NextResponse } from 'next/server'

import { publicKnowledge } from '@/content/knowledge'

export async function GET() {
  return NextResponse.json(publicKnowledge, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      ETag: `"knowledge-${publicKnowledge.metadata.version}"`,
    },
  })
}
