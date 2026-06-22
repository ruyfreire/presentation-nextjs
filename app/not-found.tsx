import Link from 'next/link'

import { ProfileErrorMessage } from '@/components/profile-error-message'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <ProfileErrorMessage
      image="/not-found.png"
      title="Página não encontrada!"
      description="Volte para a página inicial."
      link={
        <Button asChild variant="link" className="my-4">
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      }
    />
  )
}
