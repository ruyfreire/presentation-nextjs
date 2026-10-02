'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { InputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'
import { usePostSignIn } from '@/services/post-signin'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Campo obrigatório')
    .pipe(z.email('E-mail inválido')),
  password: z
    .string()
    .min(1, 'Campo obrigatório')
    .min(8, 'Mínimo de 8 caracteres'),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const { mutateAsync, isPending } = usePostSignIn()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await mutateAsync(values)
      router.push('/admin')
    } catch (error) {
      if (
        isAxiosError(error) &&
        (error.response?.status === 400 || error.response?.status === 401)
      ) {
        toast.error('Credenciais inválidas')
        return
      }

      toast.error('Erro no login')
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <InputField
                label="E-mail"
                {...form.register('email')}
                errorMessage={form.formState.errors.email?.message}
              />

              <InputField
                label="Senha"
                {...form.register('password')}
                errorMessage={form.formState.errors.password?.message}
                type="password"
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Entrar
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
