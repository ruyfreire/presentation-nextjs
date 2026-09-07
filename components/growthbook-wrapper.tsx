'use client'

import {
  GrowthBook,
  GrowthBookPayload,
  GrowthBookProvider,
} from '@growthbook/growthbook-react'
import { PropsWithChildren, useMemo } from 'react'

import {
  growthbookApiHost,
  growthbookClientKey,
  growthbookEnabled,
} from '@/configs/growthbook'

export default function GrowthBookWrapper({
  payload,
  children,
}: PropsWithChildren<{ payload: GrowthBookPayload | undefined }>) {
  const gb = useMemo(() => {
    return new GrowthBook({
      apiHost: growthbookApiHost,
      clientKey: growthbookClientKey,
      enableDevMode: process.env.NODE_ENV === 'development',
      enabled: growthbookEnabled,
    }).initSync({ payload: payload ?? {} })
  }, [payload])

  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}
