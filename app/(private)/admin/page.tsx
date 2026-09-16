import { Metadata } from 'next'

import { AdminShell } from '@/components/admin/admin-shell'
import { ProfileForm } from '@/components/admin/profile-form'

export const metadata: Metadata = {
  title: 'Admin perfil',
}

export default function AdminPage() {
  return (
    <AdminShell>
      <ProfileForm />
    </AdminShell>
  )
}
