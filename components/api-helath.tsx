'use client'

import { CircleIcon, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useGetHealth } from '@/services/get-health'

import { Badge } from './ui/badge'

type CustomBadgeProps = {
  children: React.ReactNode
  isLoading?: boolean
  isHealthy?: boolean
}

function CustomBadge({ children, isLoading, isHealthy }: CustomBadgeProps) {
  const isOnlineStatus = isHealthy === true && !isLoading
  const isOfflineStatus = isHealthy === false && !isLoading

  return (
    <Badge
      className={cn(
        'min-w-28 font-bold flex items-center gap-2 min-h-6',
        'bg-zinc-200 border-zinc-500 text-zinc-500',
        {
          'bg-green-200 border-green-500 text-green-500': isOnlineStatus,
          'bg-red-200 border-red-500 text-red-500': isOfflineStatus,
        },
      )}
    >
      {isLoading ? (
        <Loader2 className="text-zinc-500 animate-spin" />
      ) : isOnlineStatus ? (
        <CircleIcon
          strokeWidth={0}
          className="size-2! fill-green-500 animate-ping"
        />
      ) : isOfflineStatus ? (
        <CircleIcon
          strokeWidth={0}
          className="size-2! fill-red-500 animate-ping"
        />
      ) : (
        <CircleIcon strokeWidth={0} className="size-2! fill-zinc-500" />
      )}

      {children}
    </Badge>
  )
}

const ApiHealth = () => {
  const { data: isHealthy, isFetching, isError } = useGetHealth()

  if (isFetching) {
    return <CustomBadge isLoading>API Status</CustomBadge>
  }

  if (isHealthy === false || isError) {
    return <CustomBadge isHealthy={false}>API Offline</CustomBadge>
  }

  return <CustomBadge isHealthy>API Online</CustomBadge>
}

export { ApiHealth }
