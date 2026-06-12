'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button, type ButtonProps } from '@/components/ui/button'

type ModeToggleProps = ButtonProps

export function ModeToggle({ ...props }: ModeToggleProps) {
  const { setTheme } = useTheme()

  return (
    <Button
      variant="secondary"
      size="icon"
      title="Mudar tema"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      {...props}
    >
      <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
