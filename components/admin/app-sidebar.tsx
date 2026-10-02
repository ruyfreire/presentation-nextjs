'use client'

import { Loader2Icon, LogOutIcon, UserRoundIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type AppSidebarProps = {
  onLogoutAction: () => void
  isLoggingOut?: boolean
}

export function AppSidebar({ onLogoutAction, isLoggingOut }: AppSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent asChild aria-label="Navegação">
            <nav>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin')}
                    tooltip="Perfil"
                  >
                    <Link href="/admin">
                      <UserRoundIcon />
                      <span>Perfil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogoutAction}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
              tooltip="Sair"
            >
              {isLoggingOut ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <LogOutIcon />
              )}
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
