import { ModeToggle } from '@/components/mode-toggle'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col py-4">
      <ModeToggle className="fixed top-4 right-4 z-50" />
      {children}
    </div>
  )
}
