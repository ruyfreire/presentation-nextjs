'use client'

import { useRouter } from 'next/navigation'

import { CSRF_TOKEN_KEY } from '@/app/constants/tokens'
import { useGetMe } from '@/services/get-me'
import { removeSessionToken } from '@/utils/session'

import { Skeleton } from '../ui/skeleton'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data, isLoading, isError } = useGetMe()

  if (isLoading) {
    return (
      <div className="flex h-svh p-2 gap-4">
        <Skeleton className="h-full w-2/12" />
        <div className="flex flex-col h-full w-10/12 gap-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="flex-1 w-full" />
        </div>
      </div>
    )
  }

  if (!data || isError) {
    removeSessionToken(CSRF_TOKEN_KEY)
    router.replace('/signin')
    return null
  }

  return children
}
