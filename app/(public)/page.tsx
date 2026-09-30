import { cacheLife, cacheTag } from 'next/cache'

import { PROFILE_CACHE_TAG } from '@/configs/profile-cache'
import { getProfileCache } from '@/services/get-profile-cache'

import { ProfileContent } from './profile-content'

export default async function Home() {
  'use cache'
  cacheLife('weeks')
  cacheTag(PROFILE_CACHE_TAG)

  const initialProfile = await getProfileCache().catch(() => undefined)

  return <ProfileContent initialProfile={initialProfile} />
}
