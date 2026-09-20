'use client'

import { Loader2, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AppSidebar } from '@/components/admin/app-sidebar'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { usePostLogout } from '@/services/post-logout'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { mutateAsync, isPending } = usePostLogout()

  const handleLogout = async () => {
    try {
      await mutateAsync()
      router.replace('/')
    } catch {
      toast.error('Erro ao sair')
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar onLogoutAction={handleLogout} isLoggingOut={isPending} />
        <SidebarInset>
          <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-full" />
            <h1 className="text-base font-semibold">Perfil</h1>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <LogOutIcon />
                )}
                Sair
              </Button>
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
