import Image from 'next/image'

type ProfileErrorMessageProps = {
  title: string
  description: string
  image: string
  link?: React.ReactNode
}

export function ProfileErrorMessage({
  title,
  description,
  image,
  link,
}: ProfileErrorMessageProps) {
  return (
    <div className="flex fixed top-0 left-0 w-full h-full bg-muted flex-col gap-4 items-center justify-center">
      <Image
        src={image}
        alt="Erro ao carregar o perfil"
        className="dark:bg-white p-2 rounded-md"
        width={150}
        height={150}
        loading="eager"
      />

      <div className="text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        {link && link}
      </div>
    </div>
  )
}
