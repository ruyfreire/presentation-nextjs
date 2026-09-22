'use client'

import 'react-medium-image-zoom/dist/styles.css'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'

import { EvidenceItem } from '@/@types/about'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'

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
            <CarouselItem key={item.src} className="basis-full md:basis-1/2">
              <figure className="flex h-full flex-col gap-2">
                <div className="aspect-video overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                  <Zoom
                    zoomMargin={10}
                    classDialog="**:data-[rmiz-modal-overlay=visible]:bg-muted!"
                  >
                    <Image
                      src={item.src}
                      alt={`Imagem - ${item.title}`}
                      width={item.width}
                      height={item.height}
                      sizes="100vw"
                      className="object-contain"
                      loading="lazy"
                    />
                  </Zoom>
                </div>
                <figcaption className="text-sm">
                  <strong>{item.title}:</strong> {item.caption}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}
