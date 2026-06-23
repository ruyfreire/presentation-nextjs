import { Skeleton } from './ui/skeleton'

const SectionSkeleton = () => {
  return (
    <div className="flex gap-9 w-full">
      {/* date */}
      <Skeleton className="w-20 h-4 rounded-md" />

      {/* description */}
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-40 h-4 rounded-md" />
        <Skeleton className="w-40 h-4 rounded-md" />

        {/* content */}
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-2/3 h-4 rounded-md" />

        {/* tags */}
        <div className="flex gap-2">
          <Skeleton className="w-10 h-4 rounded-md" />
          <Skeleton className="w-20 h-4 rounded-md" />
          <Skeleton className="w-10 h-4 rounded-md" />
          <Skeleton className="w-20 h-4 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function SuspenseLoading() {
  return (
    <div className="w-full min-h-screen z-50 opacity-80 absolute top-0 left-0 flex flex-col py-14 px-4">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 py-2">
          {/* Imagem */}
          <Skeleton className="size-24 rounded-full" />

          <div className="flex flex-col gap-2 flex-1 py-2">
            <Skeleton className="w-56 h-7 rounded-md" />
            <Skeleton className="w-72 h-4 rounded-md" />
            <Skeleton className="w-40 h-4 rounded-md" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-8 mb-1 rounded-md" />

          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-2/3 h-4 rounded-md" />
        </div>

        {/* Experiência profissional */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Skeleton className="w-40 h-8 mb-1 rounded-md" />
            <Skeleton className="w-40 h-8 mb-1 rounded-md" />
          </div>

          <div className="flex flex-col gap-10">
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </div>
        </div>

        {/* Educação */}
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-8 mb-1 rounded-md" />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    </div>
  )
}
