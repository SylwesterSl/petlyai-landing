import { NextResponse } from 'next/server'
import { getPage } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  context: any
) {
  const slug = context?.params?.slug

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const page = await getPage(slug)

  if (!page) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(page)
}
