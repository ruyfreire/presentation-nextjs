import { BookOpenText } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button, ButtonProps } from './ui/button'

type NavigateButtonProps = ButtonProps & {
  href: string
}

export function NavigateButton(props: NavigateButtonProps) {
  return (
    <Link href={props.href}>
      <Button
        size="icon"
        {...props}
        className={cn(
          'fixed bottom-4 right-4 z-10 size-10 bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700',
          props.className,
        )}
      >
        <BookOpenText className="size-5" />
      </Button>
    </Link>
  )
}
