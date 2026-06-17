'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { InitialLoading } from '@/components/initial-loading'
import { NavigateButton } from '@/components/navigate-button'
import { NotFoundMessage } from '@/components/not-found-message'
import { Section } from '@/components/section'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

export default function Home() {
  const { data: response, isLoading: isLoadingProfile } = useGetProfile()
  const [delayInitializing, setDelayInitializing] = useState(!response)

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

  const profile = response?.data
  const isLoading = isLoadingProfile || delayInitializing

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <InitialLoading />
        ) : !!profile ? (
          <motion.div
            className=" flex gap-10 flex-col items-center"
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <Hero profile={profile} />

            <Container>
              <Section title="Sobre">
                <p className="text-justify whitespace-pre-line">
                  {profile.bio}
                </p>
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
            </Container>
          </motion.div>
        ) : (
          <NotFoundMessage />
        )}
      </AnimatePresence>

      <NavigateButton href="/about" />
    </>
  )
}
