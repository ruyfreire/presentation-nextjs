import { parseISO } from 'date-fns'

import { formatDate } from '@/utils/formatters'

import { Badge } from './ui/badge'

const BadgeUpdate = ({ date }: { date: Date | string | null | undefined }) => {
  if (typeof date !== 'string' && !(date instanceof Date)) return null

  let current: Date

  if (typeof date === 'string') {
    current = parseISO(date)
  } else {
    current = date
  }

  return (
    <Badge variant="outline">
      <strong>Atualização:</strong> {formatDate(current)}
    </Badge>
  )
}

export { BadgeUpdate }
