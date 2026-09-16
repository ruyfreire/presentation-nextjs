import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN_COOKIE } from '@/app/constants/tokens'
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)

  if (!accessToken?.value) {
    redirect('/signin')
  }

  return <AdminAuthGuard>{children}</AdminAuthGuard>
}
