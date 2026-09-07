'use client'

import {
  GrowthBook,
  GrowthBookPayload,
  GrowthBookProvider,
} from '@growthbook/growthbook-react'
import { PropsWithChildren, useMemo } from 'react'

export default function GrowthBookWrapper({
  payload,
  children,
}: PropsWithChildren<{ payload: GrowthBookPayload }>) {
  const gb = useMemo(() => {
    return new GrowthBook({
      apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      enableDevMode: process.env.NODE_ENV === 'development',
    }).initSync({ payload })
  }, [payload])
  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}
