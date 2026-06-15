'use client'

import { motion, Variants } from 'motion/react'
import { useEffect, useState } from 'react'

import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

export default function Home() {
  const { data: response, isLoading } = useGetProfile()
  const [delayInitializing, setDelayInitializing] = useState(true)

  const formatDateRange = ({
    startDate,
    endDate,
  }: {
    startDate: unknown
    endDate?: unknown
  }) => {
    if (endDate) {
      return `${formatDate(startDate, 'yyyy')} - ${formatDate(endDate, 'yyyy')}`
    }

    return formatDate(startDate, 'yyyy')
  }

  useEffect(() => {
    setTimeout(() => {
      setDelayInitializing(false)
    }, 3000)
  }, [])

  if (isLoading || delayInitializing) {
    const dotVariants: Variants = {
      pulse: {
        scale: [1, 1.5, 1],
        transition: {
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    }

    return (
      <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="w-screen h-screen flex items-center justify-center fixed z-50 gap-4"
      >
        <motion.div
          className="bg-muted size-8 rounded-full"
          variants={dotVariants}
        />
        <motion.div
          className="bg-muted size-8 rounded-full"
          variants={dotVariants}
        />
        <motion.div
          className="bg-muted size-8 rounded-full"
          variants={dotVariants}
        />
      </motion.div>
    )
  }

  if (!response) {
    return <div>Não foi possível carregar o perfil</div>
  }

  const profile = response.data

  return (
    <div className="relative w-full py-14 flex gap-10 flex-col items-center">
      <Hero profile={profile} />

      <Section title="Sobre">
        <p className="text-justify">{profile.bio}</p>
      </Section>

      <Section title="Experiência profissional">
        <Section.List>
          {profile.experiences.map((experience) => (
            <Section.Item
              key={experience.id}
              date={formatDateRange({
                startDate: experience.startDate,
                endDate: experience.endDate,
              })}
              title={experience.role}
              subtitle={experience.company}
              description={experience.description}
              tags={experience.tags}
            />
          ))}
        </Section.List>
      </Section>

      <Section title="Formação">
        <Section.List>
          {profile.education.map((education) => (
            <Section.Item
              key={education.id}
              date={formatDateRange({
                startDate: education.startDate,
                endDate: education.endDate,
              })}
              title={education.title}
              subtitle={education.institution}
              description={education.description}
              tags={education.tags}
              certificateUrl={education.certificateUrl}
            />
          ))}
        </Section.List>
      </Section>
    </div>
  )
}
