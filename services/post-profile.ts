import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateProfileType, GetProfileResponseType } from '@/@types/profile'
import { api } from '@/lib/axios'

import { PROFILE_QUERY_KEY } from './get-profile'

const POST_PROFILE_MUTATION_KEY = 'post-profile'

const postProfile = async (payload: CreateProfileType) => {
  const { data } = await api.post<GetProfileResponseType>('/profile', payload)
  return data
}

const usePostProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [POST_PROFILE_MUTATION_KEY],
    mutationFn: postProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] })
    },
  })
}

export { POST_PROFILE_MUTATION_KEY, postProfile, usePostProfile }
