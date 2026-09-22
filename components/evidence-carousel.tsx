'use client'

import { ChevronLeftIcon, ChevronRightIcon, Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { EvidenceItem } from '@/@types/about'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

function EvidenceControls() {
  const { scrollPrev, scrollNext } = useCarousel()

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-full"
        onClick={scrollPrev}
        aria-label="Imagem anterior"
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-full"
        onClick={scrollNext}
        aria-label="Próxima imagem"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

type EvidenceCarouselProps = {
  items: EvidenceItem[]
}

export function EvidenceCarousel({ items }: EvidenceCarouselProps) {
  const [item, setItem] = useState<EvidenceItem | undefined>(undefined)

  return (
    <>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="flex flex-col gap-3 w-full"
        aria-label="Capturas das camadas do projeto"
      >
        <EvidenceControls />

        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              key={item.src}
              className="basis-full md:basis-1/2 relative group hover:cursor-pointer"
              onClick={() => setItem(item)}
            >
              <div
                onClick={(event) => {
                  event.preventDefault()
                  setItem(item)
                }}
                className="py-1 px-2 pointer-events-none rounded-sm bg-background absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-2 opacity-50 flex items-center justify-center gap-2"
                title={`Abrir imagem - ${item.title}`}
                aria-label={`Abrir imagem - ${item.title}`}
              >
                <Eye className="size-6" />
                <span className="text-md font-bold">Abrir</span>
              </div>

              <figure className="flex h-full flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={item.src}
                    alt={`Imagem - ${item.title}`}
                    fill
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-sm">{item.caption}</figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dialog open={!!item} onOpenChange={() => setItem(undefined)}>
        <DialogContent className="flex h-auto max-h-[min(90svh,--spacing(300))] w-fit max-w-300! flex-col gap-4 overflow-hidden sm:max-w-300!">
          <DialogHeader className="shrink-0 pr-8">
            <DialogTitle>{item?.title}</DialogTitle>

            <DialogDescription>{item?.caption}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center">
            {item ? (
              <Image
                src={item.src}
                alt={`Imagem - ${item.title}`}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1200px) 1200px, 90vw"
                className="h-auto w-auto max-h-[calc(min(90svh,--spacing(300))-7rem)] max-w-[calc(min(90svw,--spacing(300))-3rem)] object-contain"
              />
            ) : (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="size-10 animate-spin" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
