import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

const HEALTH_QUERY_KEY = 'health'

const getHealth = async () => {
  const { status } = await api.get('/api-status', {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
  })

  return String(status).startsWith('2')
}

const useGetHealth = () => {
  return useQuery({
    queryKey: [HEALTH_QUERY_KEY],
    queryFn: getHealth,
    staleTime: 0,
    retry: 1,
    retryDelay: 1000 * 3,
    refetchInterval: 1000 * 60,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: true,
  })
}

export { getHealth, HEALTH_QUERY_KEY, useGetHealth }
