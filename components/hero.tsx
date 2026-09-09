'use client'

import { useFeatureIsOn } from '@growthbook/growthbook-react'
import { InfoIcon } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

import { ProfileType } from '@/@types/profile'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

type HeroProps = {
  profile: ProfileType
}

export function Hero({ profile }: HeroProps) {
  const openToWork = useFeatureIsOn('open_to_work')
  const { scrollY } = useScroll()
  const [animating, setAnimating] = useState({
    scrolling: false,
    isMobile: false,
  })

  useMotionValueEvent(scrollY, 'change', (current) => {
    const md = window.matchMedia('(max-width: 768px)')
    const isMobile = md.matches

    setAnimating({
      scrolling: isMobile ? current > 0 : current >= 56,
      isMobile,
    })
  })

  return (
    <motion.section
      className="py-2 px-4"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'var(--background)',
        width: '100%',
        maxWidth: 'var(--container-4xl)',
        borderBottom: '1px solid var(--background)',
      }}
      initial={{
        maxWidth: 'var(--container-4xl)',
        borderColor: 'var(--background)',
      }}
      variants={{
        scrolling: {
          maxWidth: '100vw',
          borderColor: 'var(--border)',
        },
        initial: {
          maxWidth: 'var(--container-4xl)',
          borderColor: 'var(--background)',
        },
      }}
      animate={animating.scrolling ? 'scrolling' : 'initial'}
      transition={{
        default: {
          duration: 0.5,
          ease: 'linear',
        },
        maxWidth: animating.isMobile ? { duration: 0 } : undefined,
      }}
    >
      <motion.div
        className="flex items-center gap-4 flex-col text-center md:flex-row md:text-left"
        style={{ originX: 0 }}
        variants={{
          visible: { scale: 1 },
          scrolling: { scale: 0.8 },
        }}
        animate={
          animating.scrolling && !animating.isMobile ? 'scrolling' : 'visible'
        }
        transition={{
          default: {
            duration: 0.5,
            ease: 'linear',
          },
        }}
      >
        <motion.div
          className="overflow-hidden"
          initial={{ height: 96 }}
          variants={{
            hidden: { height: 0 },
            visible: { height: 96 },
          }}
          animate={
            animating.isMobile
              ? animating.scrolling
                ? 'hidden'
                : 'visible'
              : undefined
          }
        >
          <Avatar className="size-24">
            <AvatarImage
              src={profile.imageUrl}
              alt="Foto de perfil"
              className="rounded-full"
              width={96}
              height={96}
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="flex-1">
          <h1 className="text-2xl font-extrabold">{profile.name}</h1>

          <h4>{profile.role}</h4>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={
              animating.isMobile && animating.scrolling
                ? { height: 0, opacity: 0 }
                : { height: 'auto', opacity: 1 }
            }
            transition={{ duration: 0.3, ease: 'linear' }}
          >
            {(profile.contact.location || openToWork) && (
              <p className="flex flex-col items-center gap-x-2 text-sm text-muted-foreground md:flex-row md:justify-start">
                {profile.contact.location && (
                  <span>{profile.contact.location}</span>
                )}

                {profile.contact.location && openToWork && (
                  <span aria-hidden="true" className="hidden md:inline">
                    |
                  </span>
                )}

                {openToWork && <span>Aberto a oportunidades · Remoto</span>}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 md:justify-start">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                LinkedIn
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={
          animating.isMobile && animating.scrolling
            ? { height: 0, opacity: 0 }
            : { height: 'auto', opacity: 1 }
        }
        transition={{ duration: 0.3, ease: 'linear' }}
        className="overflow-hidden mt-2 flex justify-center md:justify-end"
      >
        <Button asChild size="xs">
          <Link href="/about">
            <InfoIcon className="mr-2" />
            Como este site foi feito
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
