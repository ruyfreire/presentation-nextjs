import { ExternalLinkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Badge } from './ui/badge'

type SectionProps = React.ComponentProps<'section'> & {
  title: string
}

function Section({ children, title, ...props }: SectionProps) {
  return (
    <section className="space-y-2 max-w-4xl px-4" {...props}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  )
}

type ListProps = React.ComponentProps<'ul'>

function List({ children, ...props }: ListProps) {
  return (
    <ul className="space-y-8" {...props}>
      {children}
    </ul>
  )
}

type ItemProps = React.ComponentProps<'li'> & {
  date: string
  title: string
  subtitle?: string | null
  description?: string | null
  tags?: string[] | null
  certificateUrl?: string | null
}

function Item({
  date,
  title,
  subtitle,
  description,
  tags,
  certificateUrl,
  ...props
}: ItemProps) {
  return (
    <li
      {...props}
      className={cn('flex flex-col gap-4 items-start', props.className)}
    >
      <div className="flex items-center gap-4">
        <p className="text-sm font-light min-w-24 text-muted-foreground whitespace-nowrap">
          {date}
        </p>

        <div>
          <h3 className="font-medium text-lg leading-tight">{title}</h3>
          {subtitle && (
            <h4 className="text-muted-foreground text-sm font-semibold">
              {subtitle}
            </h4>
          )}
        </div>
      </div>

      <div className="md:ml-28 ml-0 space-y-2">
        {description && <p className="text-sm text-justify">{description}</p>}

        {tags && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {certificateUrl && (
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm underline"
          >
            Certificado
            <ExternalLinkIcon className="size-3" />
          </a>
        )}
      </div>
    </li>
  )
}

Section.List = List
Section.Item = Item

export { Section }
