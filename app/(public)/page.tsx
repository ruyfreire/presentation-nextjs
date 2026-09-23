import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cacheLife, cacheTag } from 'next/cache'

import { getProfileCache } from '@/services/get-profile-cache'

import { ProfileContent } from './profile-content'

export default async function Home() {
  'use cache'
  cacheLife('days')
  cacheTag('profile_page')

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['profile'],
    queryFn: getProfileCache,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileContent />
    </HydrationBoundary>
  )
}
