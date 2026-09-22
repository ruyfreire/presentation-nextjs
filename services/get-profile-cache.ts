'use cache'

import { cacheLife, cacheTag } from 'next/cache'

import { GetProfileResponseType } from '@/@types/profile'
import { api } from '@/lib/axios'

import { PROFILE_QUERY_KEY } from './get-profile'

export const getProfile = async () => {
  cacheTag(PROFILE_QUERY_KEY)

  const { data } = await api.get<GetProfileResponseType>('/profile')

  cacheLife('max')
  return data
}
