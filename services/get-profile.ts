import { useQuery } from '@tanstack/react-query'

import { GetProfileResponseType } from '@/@types/profile'
import { api } from '@/lib/axios'

const PROFILE_QUERY_KEY = 'profile'

const getProfile = async () => {
  if (typeof window === 'undefined') {
    const { serverApi } = await import('@/lib/axios-server')
    const { data } = await serverApi.get<GetProfileResponseType>('/profile')
    return data
  }

  const { data } = await api.get<GetProfileResponseType>('/profile')
  return data
}

const useGetProfile = () => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  })
}

export { getProfile, PROFILE_QUERY_KEY, useGetProfile }
