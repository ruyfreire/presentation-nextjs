import axios from 'axios'

import { CSRF_TOKEN_KEY } from '@/app/constants/tokens'
import { getSessionToken } from '@/utils/session'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60, // 1 minute in milliseconds
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getSessionToken(CSRF_TOKEN_KEY)
  if (token) {
    config.headers['x-csrf-token'] = token
  }
  return config
})

export { api }
