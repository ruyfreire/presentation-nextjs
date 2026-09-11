'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { motion, useInView, useScroll } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

import { ExperienceType } from '@/@types/profile'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatters'

import { Badge } from './ui/badge'

function formatPeriod({ startDate, endDate }: ExperienceType) {
  if (endDate) {
    return (
      <>
        <span>{formatDate(startDate, 'yyyy')}</span>
        <span aria-hidden="true" className="hidden md:inline">
          -
        </span>
        <span aria-hidden="true" className="md:hidden">
          |
        </span>
        <span>{formatDate(endDate, 'yyyy')}</span>
      </>
    )
  }

  return formatDate(startDate, 'yyyy')
}

function ExpandableDescription({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: string
}) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useLayoutEffect(() => {
    const element = textRef.current
    if (!element) return

    const measure = () => {
      if (expanded) return
      setOverflows(element.scrollHeight > element.clientHeight + 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [children, expanded])

  return (
    <div>
      <p
        id={id}
        ref={textRef}
        className={cn('text-sm text-justify whitespace-pre-line', {
          'line-clamp-3 md:line-clamp-none': !expanded,
        })}
      >
        {children}
      </p>

      {overflows && (
        <button
          type="button"
          className={cn(
            'h-8 md:hidden',
            'text-nowrap cursor-pointer text-xs relative w-full translate-y-[-20%]',
          )}
          aria-expanded={expanded}
          aria-controls={id}
          aria-label={
            expanded ? `Ver menos sobre ${label}` : `Ver mais sobre ${label}`
          }
          onClick={() => setExpanded((current) => !current)}
        >
          <span className="font-semibold px-2 bg-background rounded-md text-muted-foreground">
            {expanded ? 'Ver menos' : 'Ver mais'}
          </span>

          <span className="absolute w-full h-px top-1/2 -translate-y-1/2 z-[-1] bg-muted-foreground/50 left-0 right-0" />
        </button>
      )}
    </div>
  )
}

const MAX_VISIBLE_TAGS = 5

function ExpandableTags({ tags, label }: { tags: string[]; label: string }) {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = tags.length > MAX_VISIBLE_TAGS
  const visibleTags =
    expanded || !hasOverflow ? tags : tags.slice(0, MAX_VISIBLE_TAGS)

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}

      {hasOverflow && (
        <Badge variant="outline" className="cursor-pointer" asChild>
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={
              expanded ? `Ver menos tags de ${label}` : `Ver mais tags de ${label}`
            }
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? <MinusIcon /> : <PlusIcon />}
          </button>
        </Badge>
      )}
    </div>
  )
}

function TimelineItem({ experience }: { experience: ExperienceType }) {
  const dotRef = useRef<HTMLSpanElement>(null)
  const reached = useInView(dotRef, { margin: '0px 0px -50% 0px' })

  return (
    <li className="flex gap-3 md:gap-4">
      <p className="w-9 shrink-0 pt-1 text-sm font-light flex flex-col items-center md:items-start md:gap-1 md:flex-row whitespace-nowrap text-muted-foreground md:w-24">
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
          <ExpandableDescription id={experience.id} label={experience.role}>
            {experience.description}
          </ExpandableDescription>
        )}

        {experience.tags && experience.tags.length > 0 && (
          <ExpandableTags tags={experience.tags} label={experience.role} />
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
        className="absolute top-3 bottom-2 w-0.5 -translate-x-1/2 bg-muted left-13.5 md:left-29.5"
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
