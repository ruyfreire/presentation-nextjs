'use server'

import { updateTag } from 'next/cache'

import { PROFILE_CACHE_TAG } from '@/configs/profile-cache'
import { getProfileCache } from '@/services/get-profile-cache'

export async function revalidateProfile() {
  updateTag(PROFILE_CACHE_TAG)
  await getProfileCache()
}
