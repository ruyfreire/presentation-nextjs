'use client'

import { Hero } from '@/components/hero'
import { Section } from '@/components/section'
import { useGetProfile } from '@/services/get-profile'
import { formatDate } from '@/utils/formatters'

export default function Home() {
  const { data: response, isLoading } = useGetProfile()

  const formatRangeDate = ({
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

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!response) {
    return <div>Não foi possível carregar o perfil</div>
  }

  const profile = response.data

  return (
    <div className="relative w-full max-w-4xl py-14 px-4 flex gap-10 flex-col mx-auto">
      <Hero profile={profile} />

      <Section title="Sobre">
        <p>{profile.bio}</p>
      </Section>

      <Section title="Experiência profissional">
        <Section.List>
          {profile.experiences.map((experience) => (
            <Section.Item
              key={experience.id}
              date={formatRangeDate({
                startDate: experience.startDate,
                endDate: experience.endDate,
              })}
              title={experience.company}
              description={experience.description}
            />
          ))}
        </Section.List>
      </Section>

      <Section title="Formação">
        <Section.List>
          {profile.education.map((education) => (
            <Section.Item
              key={education.id}
              date={formatRangeDate({
                startDate: education.startDate,
                endDate: education.endDate,
              })}
              title={education.title}
              description={education.description}
            />
          ))}
        </Section.List>
      </Section>
    </div>
  )
}
