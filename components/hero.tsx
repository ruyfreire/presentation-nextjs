'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { ProfileType } from '@/@types/profile'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type HeroProps = {
  profile: ProfileType
}

export function Hero({ profile }: HeroProps) {
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
              alt="Imagem de perfil"
              className="rounded-full"
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>

        <div>
          <h1 className="text-2xl font-extrabold">{profile.name}</h1>

          <h4>{profile.role}</h4>

          <p className="inline-flex items-center gap-1 text-muted-foreground">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            |
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </motion.div>
    </motion.section>
  )
}
