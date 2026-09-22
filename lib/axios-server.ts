import 'server-only'

import axios from 'axios'

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60, // 1 minute in milliseconds
})

export { apiServer }
