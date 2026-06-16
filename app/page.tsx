'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Hero } from '@/components/hero'
import { InitialLoading } from '@/components/initial-loading'
import { Section } from '@/components/section'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

export default function Home() {
  const { data: response, isLoading: isLoadingProfile } = useGetProfile()
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

  const isLoading = isLoadingProfile || delayInitializing
  const profile = response?.data

  return (
    <div className="relative w-full py-14 flex gap-10 flex-col items-center">
      <AnimatePresence>
        {isLoading ? (
          <InitialLoading />
        ) : !!profile ? (
          <motion.div
            className=" flex w-full gap-10 flex-col items-center"
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
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
          </motion.div>
        ) : (
          <div className="flex fixed top-0 left-0 w-full h-full bg-muted flex-col gap-4 items-center justify-center">
            <Image
              src="/found-error.png"
              alt="Erro ao carregar o perfil"
              className="dark:bg-white p-2 rounded-md"
              width={150}
              height={150}
            />

            <div className="text-center">
              <h1 className="text-xl font-bold">
                Ops, Erro ao carregar o perfil
              </h1>
              <p className="text-sm text-muted-foreground">
                Tente novamente mais tarde.
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
