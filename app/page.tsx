'use client'

import { isAxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/container'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { Hero } from '@/components/hero'
import { InitialLoading } from '@/components/initial-loading'
import { LoadingDialog } from '@/components/loading-dialog'
import { ProfileErrorMessage } from '@/components/profile-error-message'
import { Section } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

const TIME_LIMIT = 5_000 // 5 seconds in milliseconds

export default function Home() {
  const startTime = useRef<number | null>(null)
  const [loadingTime, setLoadingTime] = useState(false)

  const {
    data: response,
    isLoading: isLoadingProfile,
    isError,
    failureReason,
  } = useGetProfile()

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
    startTime.current = Date.now()

    const interval = setInterval(() => {
      if (startTime.current) {
        if (Date.now() - startTime.current > TIME_LIMIT) {
          setLoadingTime(true)
          clearInterval(interval)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const profile = response?.data
  const isNotFound =
    isAxiosError(failureReason) && failureReason?.status === 404
  const isLoading = isLoadingProfile
  const isLoadingTime = loadingTime && isLoading && !profile

  if (isError && !isNotFound) {
    return (
      <ProfileErrorMessage
        image="/error.png"
        title="Ops, Erro ao carregar o perfil!"
        description="Tente novamente mais tarde."
      />
    )
  }

  if (isNotFound || (!isLoading && !profile)) {
    return (
      <ProfileErrorMessage
        image="/not-found.png"
        title="Ops, Perfil não encontrado!"
        description="Não foi possível encontrar o perfil solicitado."
      />
    )
  }

  return (
    <>
      {isLoading ? (
        <>
          <InitialLoading />
          {isLoadingTime && <LoadingDialog />}
        </>
      ) : !!profile ? (
        <div className="flex gap-10 flex-col items-center [overflow-anchor:none]">
          <Hero profile={profile} />

          <Container>
            <Section title="Sobre">
              <p className="text-justify whitespace-pre-line">{profile.bio}</p>
            </Section>

            <Section title="Experiência profissional">
              <ExperienceTimeline experiences={profile.experiences} />
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

            <div className="flex justify-end border-t pt-2">
              <Badge variant="outline">{`Versão: ${profile.version}`}</Badge>
            </div>
          </Container>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}
