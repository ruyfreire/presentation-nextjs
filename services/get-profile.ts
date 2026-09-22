import { useQuery } from '@tanstack/react-query'

import { getProfile } from './get-profile-cache'

const PROFILE_QUERY_KEY = 'profile'

const useGetProfile = () => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  })
}

export { PROFILE_QUERY_KEY, useGetProfile }
