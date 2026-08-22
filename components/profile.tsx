'use client'

import { isAxiosError } from 'axios'

import { Container } from '@/components/container'
import { Hero } from '@/components/hero'
import { InitialLoading } from '@/components/initial-loading'
import { NavigateButton } from '@/components/navigate-button'
import { ProfileErrorMessage } from '@/components/profile-error-message'
import { Section } from '@/components/section'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

export function Profile() {
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

  const profile = response?.data
  const isNotFound =
    isAxiosError(failureReason) && failureReason?.status === 404
  const isLoading = isLoadingProfile

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
        <InitialLoading />
      ) : !!profile ? (
        <div className=" flex gap-10 flex-col items-center">
          <Hero profile={profile} />

          <Container>
            <Section title="Sobre">
              <p className="text-justify whitespace-pre-line">{profile.bio}</p>
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
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      <NavigateButton href="/about" />
    </>
  )
}
