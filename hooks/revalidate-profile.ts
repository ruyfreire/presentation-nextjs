'use server'

import { updateTag } from 'next/cache'

import { PROFILE_QUERY_KEY } from '@/services/get-profile'

export async function revalidateProfile() {
  updateTag(PROFILE_QUERY_KEY)
}
