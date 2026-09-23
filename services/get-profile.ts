import { useQuery } from '@tanstack/react-query'

import { GetProfileResponseType } from '@/@types/profile'
import { api } from '@/lib/axios'

const PROFILE_QUERY_KEY = 'profile'

export const getProfile = async () => {
  const { data } = await api.get<GetProfileResponseType>('/profile')

  return data
}

const useGetProfile = () => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  })
}

export { PROFILE_QUERY_KEY, useGetProfile }
