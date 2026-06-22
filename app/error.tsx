'use client'

import { useEffect } from 'react'

import { ProfileErrorMessage } from '@/components/profile-error-message'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ProfileErrorMessage
      image="/error.png"
      title="Ops, Ocorreu um erro inesperado!"
      description="Tente novamente ou recarregue a página."
      link={
        <Button
          className="cursor-pointer my-4"
          onClick={() => unstable_retry()}
        >
          Tentar novamente
        </Button>
      }
    />
  )
}
