import { NextRequest, NextResponse } from 'next/server'

import { publicKnowledge } from '@/content/knowledge'

export async function GET(request: NextRequest) {
  const etag = `"knowledge-${publicKnowledge.metadata.version}"`

  if (request.headers.get('if-none-match') === etag) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
        ETag: etag,
      },
    })
  }

  return NextResponse.json(publicKnowledge, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
      ETag: etag,
    },
  })
}
