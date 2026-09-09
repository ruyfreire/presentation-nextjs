'use client'

import { motion, useInView, useScroll } from 'motion/react'
import { useRef } from 'react'

import { ExperienceType } from '@/@types/profile'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatters'

import { Badge } from './ui/badge'

function formatPeriod({ startDate, endDate }: ExperienceType) {
  if (endDate) {
    return `${formatDate(startDate, 'yyyy')} - ${formatDate(endDate, 'yyyy')}`
  }

  return formatDate(startDate, 'yyyy')
}

function TimelineItem({ experience }: { experience: ExperienceType }) {
  const dotRef = useRef<HTMLSpanElement>(null)
  const reached = useInView(dotRef, { margin: '0px 0px -50% 0px' })

  return (
    <li className="flex gap-3 md:gap-4">
      <p className="w-20 shrink-0 pt-1 text-xs font-light whitespace-nowrap text-muted-foreground md:w-24 md:pt-0.5 md:text-sm">
        {formatPeriod(experience)}
      </p>

      <span className="flex w-3 shrink-0 justify-center">
        <span
          ref={dotRef}
          className={cn(
            'mt-1.5 size-3 rounded-full ring-4 ring-background transition-colors duration-300',
            reached ? 'bg-foreground' : 'bg-muted',
          )}
        />
      </span>

      <div className="min-w-0 flex-1 space-y-4 pb-2">
        <div>
          <h3 className="text-lg leading-tight font-medium">
            {experience.role}
          </h3>
          <h4 className="text-sm font-semibold text-muted-foreground">
            {experience.company}
          </h4>
        </div>

        {experience.description && (
          <p className="text-sm whitespace-pre-line md:text-justify">
            {experience.description}
          </p>
        )}

        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {experience.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

type ExperienceTimelineProps = {
  experiences: ExperienceType[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  if (experiences.length === 0) return null

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-3 bottom-2 w-0.5 -translate-x-1/2 bg-muted left-24.5 md:left-29.5"
      >
        <motion.div
          className="h-full w-full origin-top bg-foreground"
          style={{ scaleY: scrollYProgress }}
        />
      </div>

      <ul className="space-y-8">
        {experiences.map((experience) => (
          <TimelineItem key={experience.id} experience={experience} />
        ))}
      </ul>
    </div>
  )
}
