import { format, isValid, parseISO } from 'date-fns'

export function formatDate(date: unknown, formatString: string = 'dd/MM/yyyy') {
  if (typeof date !== 'string' && !(date instanceof Date)) return ''

  let current: Date

  if (typeof date === 'string') {
    current = parseISO(date)
  } else {
    current = date
  }

  if (!isValid(current)) return ''

  return format(current, formatString)
}
