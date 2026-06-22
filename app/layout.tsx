import './globals.css'

import { LoaderCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'

import { ModeToggle } from '@/components/mode-toggle'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { newRelicScript } from '@/configs/newrelic-script'
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
      <body className="min-h-full tracking-wide">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ModeToggle className="fixed top-4 right-4 z-50" />
            <Suspense
              fallback={
                <div className="flex w-full min-h-screen bg-muted flex-col gap-4 items-center justify-center">
                  <LoaderCircle className="size-40 animate-spin" />
                </div>
              }
            >
              {children}
            </Suspense>
          </ThemeProvider>
        </ReactQueryProvider>

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              id="contentsquare-agent"
              src="https://t.contentsquare.net/uxa/b7bcadbeefd8e.js"
              strategy="beforeInteractive"
            />

            <Script
              id="newrelic-agent"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{ __html: newRelicScript }}
            />
          </>
        )}
      </body>
    </html>
  )
}
