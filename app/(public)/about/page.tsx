import { ExternalLinkIcon } from 'lucide-react'
import * as motion from 'motion/react-client'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ApiHealth } from '@/components/api-helath'
import { Container } from '@/components/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { aboutDecisions, aboutIntro, aboutStack } from './about-content'

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

function GithubButton({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild variant="link" size="xs" className="cursor-pointer p-0">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
        </svg>

        {label}
      </a>
    </Button>
  )
}

export const metadata: Metadata = {
  title: 'Sobre este projeto',
  description:
    'Informações sobre a construção do projeto e as tecnologias utilizadas.',
}

export default function About() {
  return (
    <Container>
      <section className="flex flex-col gap-6">
        <div>
          <Button asChild variant="outline" size="xs">
            <Link href="/">Voltar ao currículo</Link>
          </Button>
        </div>

        <h1 className="text-2xl font-bold">{aboutIntro.title}</h1>

        <Reveal className="space-y-4">
          {aboutIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <div className="rounded-md dark:bg-primary bg-linear-to-br from-rose-800/50 to-teal-800/50 flex items-center justify-center p-4">
          <Image
            src="/ecosystem.png"
            alt="Desenho do ecossistema do projeto"
            width={808}
            height={439}
            className="w-full h-auto max-w-xl object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">{aboutDecisions.title}</h2>

        <Reveal className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {aboutDecisions.items.map((item) => (
            <article
              key={item.title}
              className="space-y-2 rounded-md border p-4 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <h3 className="font-semibold">{item.title}</h3>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </Reveal>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">{aboutStack.title}</h2>

        <Reveal className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {aboutStack.groups.map((group) => (
              <div key={group.label} className="space-y-2">
                <h3 className="text-sm font-medium">{group.label}</h3>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div>
        <hr className="mb-4" />

        <footer className="flex gap-8 justify-between md:flex-row flex-col items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {aboutStack.githubs.map((repo) => (
              <GithubButton
                key={repo.href}
                href={repo.href}
                label={repo.label}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="xs"
              className="rounded-full font-bold flex items-center gap-2"
              asChild
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/docs`}
                target="_blank"
              >
                API Swagger
                <ExternalLinkIcon className="w-4 h-4" />
              </Link>
            </Button>

            <ApiHealth />
          </div>
        </footer>
      </div>
    </Container>
  )
}
