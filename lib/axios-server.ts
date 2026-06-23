'use server'

import axios from 'axios'

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: process.env.API_TOKEN ?? '',
  },
})

export { serverApi }
