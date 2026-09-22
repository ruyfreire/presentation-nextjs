'use server'

import { revalidateTag } from 'next/cache'

import { PROFILE_QUERY_KEY } from '@/services/get-profile'

export async function revalidateProfile() {
  revalidateTag(PROFILE_QUERY_KEY, 'max')
}
