import { readFileSync } from 'node:fs'
import { join } from 'node:path'
export const newRelicScript = readFileSync(
  join(process.cwd(), 'configs/newrelic-script.txt'),
  'utf8',
)
