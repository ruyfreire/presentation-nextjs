'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { removeCsrfToken } from '@/lib/axios'
import { useGetMe } from '@/services/get-me'

import { Skeleton } from '../ui/skeleton'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data, isLoading, isError } = useGetMe()

  useEffect(() => {
    if (!data && !isLoading) {
      removeCsrfToken()
      router.replace('/signin')
    }
  }, [data, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-svh p-1 gap-4">
        <Skeleton className="h-full hidden md:block max-w-4/12 w-[256px]" />
        <div className="flex flex-col h-full flex-1 gap-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="flex-1 w-full" />
        </div>
      </div>
    )
  }

  if (!data || isError) {
    return null
  }

  return children
}
