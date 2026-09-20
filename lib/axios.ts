import axios from 'axios'
import { toast } from 'sonner'

let csrfToken: string | undefined = undefined

export const getCsrfToken = () => {
  return csrfToken
}

export const setCsrfToken = (token: string) => {
  csrfToken = token
}

export const removeCsrfToken = () => {
  csrfToken = undefined
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60, // 1 minute in milliseconds
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getCsrfToken()
  if (token) {
    config.headers['x-csrf-token'] = token
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      if (error.response?.config?.url !== '/auth/me') {
        removeCsrfToken()
        window.location.href = '/signin'
      }
    }

    if (error.response?.status === 429) {
      toast.error(
        'Você atingiu o limite de requisições. Tente novamente mais tarde.',
      )
    }

    return Promise.reject(error)
  },
)

export { api }
