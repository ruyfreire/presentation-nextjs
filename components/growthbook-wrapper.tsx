'use client'

import { GrowthBook, GrowthBookProvider } from '@growthbook/growthbook-react'
import { PropsWithChildren, useEffect, useMemo } from 'react'

import {
  growthbookApiHost,
  growthbookClientKey,
  growthbookEnabled,
} from '@/configs/growthbook'

export default function GrowthBookWrapper({ children }: PropsWithChildren) {
  const gb = useMemo(() => {
    return new GrowthBook({
      apiHost: growthbookApiHost,
      clientKey: growthbookClientKey,
      enableDevMode: process.env.NODE_ENV === 'development',
      enabled: growthbookEnabled,
    }).initSync({ payload: {} })
  }, [])

  useEffect(() => {
    if (!growthbookEnabled) return

    gb.init({ streaming: true, timeout: 1_000, skipCache: true })

    return () => {
      gb.destroy()
    }
  }, [gb])

  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}
