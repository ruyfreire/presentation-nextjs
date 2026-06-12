import { externalApi } from '@/lib/axios'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await externalApi.get('/profile')

  return NextResponse.json(response.data)
}
