import './globals.css'

import { GrowthBook } from '@growthbook/growthbook'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import GrowthBookWrapper from '@/components/growthbook-wrapper'
import { ModeToggle } from '@/components/mode-toggle'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import {
  growthbookApiHost,
  growthbookClientKey,
  growthbookEnabled,
} from '@/configs/growthbook'
import { newRelicScript } from '@/configs/newrelic-script'
import { cn } from '@/lib/utils'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
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

const initGrowthbook = async () => {
  if (!growthbookEnabled) {
    return undefined
  }

  const gb = new GrowthBook({
    apiHost: growthbookApiHost,
    clientKey: growthbookClientKey,
  })
  await gb.init({ timeout: 1_000 })
  const payload = gb.getDecryptedPayload()
  gb.destroy()
  return payload
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await initGrowthbook()

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn('h-full', 'antialiased', 'font-sans', montserrat.className)}
    >
      <body className="min-h-full tracking-wide">
        <GrowthBookWrapper payload={payload}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <ModeToggle className="fixed top-4 right-4 z-50" />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </GrowthBookWrapper>

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
