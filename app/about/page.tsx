import * as motion from 'motion/react-client'
import Image from 'next/image'

import { Container } from '@/components/container'
import { NavigateButton } from '@/components/navigate-button'
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
    <Button asChild variant="outline" size="xs" className="cursor-pointer">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path
            d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M104,208H72a32,32,0,0,1-32-32A32,32,0,0,0,8,144"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
        {label}
      </a>
    </Button>
  )
}

export default function About() {
  return (
    <>
      <Container>
        <section className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">{aboutIntro.title}</h1>

          <Reveal className="space-y-4">
            {aboutIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="rounded-4xl dark:bg-primary bg-linear-to-br from-rose-800/50 to-teal-800/50 flex items-center justify-center p-4">
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
                className="space-y-2 rounded-lg border p-4 transition-transform duration-200 hover:-translate-y-0.5"
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">GitHub:</span>
              {aboutStack.githubs.map((repo) => (
                <GithubButton
                  key={repo.href}
                  href={repo.href}
                  label={repo.label}
                />
              ))}
            </div>

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
      </Container>

      <NavigateButton href="/" />
    </>
  )
}
