import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ModeToggle } from '@/components/mode-toggle'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

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
      className={cn('h-full', 'antialiased', 'font-sans', montserrat.variable)}
    >
      <body className="min-h-full">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle className="fixed top-4 right-4 z-50" />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
