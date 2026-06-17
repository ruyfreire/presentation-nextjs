import Image from 'next/image'

export function NotFoundMessage() {
  return (
    <div className="flex fixed top-0 left-0 w-full h-full bg-muted flex-col gap-4 items-center justify-center">
      <Image
        src="/found-error.png"
        alt="Erro ao carregar o perfil"
        className="dark:bg-white p-2 rounded-md"
        width={150}
        height={150}
      />

      <div className="text-center">
        <h1 className="text-xl font-bold">Ops, Erro ao carregar o perfil</h1>
        <p className="text-sm text-muted-foreground">
          Tente novamente mais tarde.
        </p>
      </div>
    </div>
  )
}
