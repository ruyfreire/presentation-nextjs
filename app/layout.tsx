import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Ruy Freire',
  description: 'Apresentação do perfil profissional',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', 'font-sans', inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle className="fixed top-4 right-4" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
