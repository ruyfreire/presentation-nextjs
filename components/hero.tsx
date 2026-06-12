import Image from 'next/image'

import { ProfileType } from '@/@types/profile'

type HeroProps = {
  profile: ProfileType
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="flex items-center gap-4 flex-col text-center md:flex-row md:text-left">
      <div>
        <Image
          src="https://github.com/ruyfreire.png"
          alt="Imagem de perfil"
          width={100}
          height={100}
          className="rounded-full"
          loading="eager"
        />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold">{profile.name}</h1>
        <h4>{profile.role}</h4>
        <p className="inline-flex items-center gap-1 text-muted-foreground">
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          |
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  )
}
