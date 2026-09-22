import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import GrowthBookWrapper from '@/components/growthbook-wrapper'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { newRelicScript } from '@/configs/newrelic-script'
import { cn } from '@/lib/utils'
import { getSiteUrl } from '@/utils/site-url'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    template: '%s | Ruy Freire - Engenheiro de Software',
    default: 'Ruy Freire - Engenheiro de Software',
  },
  description:
    'Apresentação do perfil profissional de Ruy Freire, engenheiro de software.',
  verification: {
    google: 'NHJVfV3TYjUX3YCt4jlOkZ6g53IVtxbHC2CML57Zm5Y',
  },
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
      className={cn('h-full', 'antialiased', 'font-sans', montserrat.className)}
    >
      <body className="min-h-svh tracking-wide">
        <GrowthBookWrapper>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" closeButton richColors />
            </ThemeProvider>
          </ReactQueryProvider>
        </GrowthBookWrapper>

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              id="contentsquare-agent"
              src="https://t.contentsquare.net/uxa/b7bcadbeefd8e.js"
              strategy="afterInteractive"
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
