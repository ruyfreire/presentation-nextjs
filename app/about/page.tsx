'use client'

import { Container } from '@/components/container'
import { NavigateButton } from '@/components/navigate-button'
import { Button } from '@/components/ui/button'

function GithubButton({ href }: { href: string }) {
  return (
    <Button asChild variant="outline" size="xs" className="cursor-pointer">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <path
            d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <path
            d="M104,208H72a32,32,0,0,1-32-32A32,32,0,0,0,8,144"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
        GitHub
      </a>
    </Button>
  )
}

export default function About() {
  return (
    <>
      <Container>
        <h1 className="text-2xl font-bold underline">Indo além do frontend</h1>

        <section className="space-y-2">
          <h4 className="text-md font-bold">Frontend</h4>

          <div className="[&_a]:underline">
            <p>
              Esta aplicação foi construída com Next.js e TypeScript, utilizando
              Tailwind CSS e Shadcn UI para estilização e componentes e Lucide
              React para ícones.
            </p>

            <p>
              Fazendo chamadas em uma API REST utilizando o Tanstack Query
              (React Query) e Axios. Também utilizando o motion para animações.
            </p>
          </div>

          <GithubButton href="https://github.com/ruyfreire/presentation-nextjs" />
        </section>

        <section>
          <h4>Backend</h4>

          <div>
            <p>
              O Backend foi construído com NestJS e TypeScript, utilizando
              Mongoose para interação com o banco de dados. JWT para
              autenticação das rotas. E Jest para testes.
            </p>
          </div>
        </section>

        <section>
          <h4>Banco de dados</h4>
          <p>
            O banco de dados utilizado foi o MongoDB (MongoDB Atlas). Escolhido
            pela flexibilidade ao modificar a estrutura de dados servida para
            este projeto
          </p>
        </section>

        <section>
          <h4>Infraestrutura</h4>
          <p>
            Os projetos foram hospedados em infraestrutura gratuita, utilizando
            Vercel para o frontend, Railway para o backend e MongoDB Atlas para
            o banco de dados.
          </p>
        </section>
      </Container>

      <NavigateButton href="/" />
    </>
  )
}
