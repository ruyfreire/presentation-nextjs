import { NextResponse } from 'next/server'

import { externalApi } from '@/lib/axios'

export async function GET() {
  const response = await externalApi.get('/profile')

  return NextResponse.json(response.data)
}
