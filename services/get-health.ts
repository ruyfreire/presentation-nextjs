import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

const HEALTH_QUERY_KEY = 'health'

const getHealth = async () => {
  const { status } = await api.get('/health')
  return status === 204
}

const useGetHealth = () => {
  return useQuery({
    queryKey: [HEALTH_QUERY_KEY],
    queryFn: getHealth,
    refetchInterval: 1000 * 60,
    retry: false,
  })
}

export { getHealth, HEALTH_QUERY_KEY, useGetHealth }
