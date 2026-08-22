import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120_000, // 2 minutes in milliseconds
})

export { api }
