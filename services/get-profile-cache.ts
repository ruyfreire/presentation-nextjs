import { cacheLife, cacheTag } from 'next/cache'

import { GetProfileResponseType } from '@/@types/profile'
import { PROFILE_CACHE_TAG } from '@/configs/profile-cache'
import { apiServer } from '@/lib/axios-server'

export const getProfileCache = async () => {
  'use cache'
  cacheLife('weeks')
  cacheTag(PROFILE_CACHE_TAG)

  const { data } = await apiServer.get<GetProfileResponseType>('/profile')

  return data
}
