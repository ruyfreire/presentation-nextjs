import { cn } from '@/lib/utils'

type SectionProps = React.ComponentProps<'section'> & {
  title: string
}

function Section({ children, title, ...props }: SectionProps) {
  return (
    <section className="space-y-2" {...props}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  )
}

type ListProps = React.ComponentProps<'ul'>

function List({ children, ...props }: ListProps) {
  return (
    <ul className="" {...props}>
      {children}
    </ul>
  )
}

type ItemProps = React.ComponentProps<'li'> & {
  date: string
  title: string
  description?: string | null
}

function Item({ date, title, description, ...props }: ItemProps) {
  return (
    <li
      {...props}
      className={cn('flex flex-col gap-4 items-start', props.className)}
    >
      <div className="flex gap-4">
        <p className="text-sm min-w-24 text-muted-foreground whitespace-nowrap">
          {date}
        </p>

        <h3 className="font-medium underline">{title}</h3>
      </div>

      <div className="md:ml-28 ml-0">{description && <p>{description}</p>}</div>
    </li>
  )
}

Section.List = List
Section.Item = Item

export { Section }
