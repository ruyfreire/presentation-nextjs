import { GetProfileParamsType, GetProfileResponseType } from '@/@types/profile'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const PROFILE_QUERY_KEY = 'profile'

const getProfile = async (params: GetProfileParamsType = {}) => {
  const { data } = await api.get<GetProfileResponseType>('/profile', {
    params,
  })

  return data
}

const useGetProfile = (params: GetProfileParamsType = {}) => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY, params],
    queryFn: () => getProfile(params),
  })
}

export { getProfile, useGetProfile, PROFILE_QUERY_KEY }
