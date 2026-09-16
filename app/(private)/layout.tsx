import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'

export default async function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>
}
