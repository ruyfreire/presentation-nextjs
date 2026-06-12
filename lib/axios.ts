import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const externalApi = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    Authorization: process.env.API_TOKEN,
  },
})

export { api, externalApi }
