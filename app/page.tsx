import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { Profile } from '@/components/profile'
import { queryClient } from '@/lib/react-query'
import { getProfile, PROFILE_QUERY_KEY } from '@/services/get-profile'

export default async function Home() {
  await queryClient.prefetchQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: () => getProfile(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  )
}
