import { useMutation } from '@tanstack/react-query'

import { LogoutResponseType } from '@/@types/logout'
import { api, removeCsrfToken } from '@/lib/axios'

const LOGOUT_MUTATION_KEY = 'logout'

const postLogout = async () => {
  const { data } = await api.post<LogoutResponseType>('/auth/logout')
  removeCsrfToken()
  return data
}

const usePostLogout = () => {
  return useMutation({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: postLogout,
  })
}

export { LOGOUT_MUTATION_KEY, postLogout, usePostLogout }
