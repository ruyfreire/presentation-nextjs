import { useMutation } from '@tanstack/react-query'

import { SignInPayloadType, SignInResponseType } from '@/@types/signin'
import { api, setCsrfToken } from '@/lib/axios'

const SIGNIN_MUTATION_KEY = 'signin'

const postSignIn = async (payload: SignInPayloadType) => {
  const { data } = await api.post<SignInResponseType>('/auth/signin', payload)
  setCsrfToken(data.data.csrfToken)
  return data
}

const usePostSignIn = () => {
  return useMutation({
    mutationKey: [SIGNIN_MUTATION_KEY],
    mutationFn: postSignIn,
  })
}

export { postSignIn, SIGNIN_MUTATION_KEY, usePostSignIn }
