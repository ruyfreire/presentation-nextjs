import { useQuery } from '@tanstack/react-query'

import { GetMeResponseType } from '@/@types/me'
import { api } from '@/lib/axios'

const ME_QUERY_KEY = 'me'

const getMe = async () => {
  const { data } = await api.get<GetMeResponseType>('/auth/me')
  return data
}

const useGetMe = () => {
  return useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: getMe,
    retry: 1,
  })
}

export { getMe, ME_QUERY_KEY, useGetMe }
