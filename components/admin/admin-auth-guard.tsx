'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { CSRF_TOKEN_KEY } from '@/app/constants/tokens'
import { getSessionToken } from '@/utils/session'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = getSessionToken(CSRF_TOKEN_KEY)

    if (!token) {
      router.replace('/signin')
    }
  }, [router])

  return children
}
