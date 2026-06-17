'use client'

import { motion, stagger, SVGMotionProps, Variants } from 'motion/react'

const MotionPath = (props: SVGMotionProps<SVGPathElement>) => {
  const draw: Variants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      strokeLinecap: 'butt',
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      stroke: [
        'var(--secondary-foreground)',
        'var(--muted-foreground)',
        'var(--secondary-foreground)',
      ],
      strokeLinecap: props.strokeLinecap === 'round' ? 'round' : 'butt',
      transition: {
        pathLength: { duration: 0.3, ease: 'easeInOut' },
        strokeLinecap: { delay: 0.3 },
        stroke: {
          repeat: Infinity,
          duration: 3,
          when: 'afterChildren',
          delay: 2,
        },
      },
    },
  }

  return (
    <motion.path
      fill="none"
      stroke="currentColor"
      variants={draw}
      strokeWidth={15}
      {...props}
    />
  )
}

function Details({
  x = 0,
  y = 40,
  showDescription = false,
}: {
  x?: number
  y?: number
  showDescription?: boolean
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Data */}
      <g transform="translate(10, 10)">
        <MotionPath d="M 0 0 L 40 0" />
        <MotionPath d="M 55 0 L 95 0" />
      </g>

      {/* Título + Descrição */}
      <g transform="translate(135, 0)">
        <MotionPath d="M 0 0 L 200 0" />
        <MotionPath d="M 0 25 L 150 25" />

        {showDescription && (
          <g transform="translate(0, 65)">
            <MotionPath d="M 0 0 L 850 0" />
            <MotionPath d="M 0 25 L 700 25" />
          </g>
        )}

        {/* Badge */}
        <g transform={`translate(10, ${showDescription ? 120 : 50})`}>
          <MotionPath
            d="M 0 0 L 100 0"
            strokeWidth={25}
            strokeLinecap="round"
          />

          <MotionPath
            d="M 130 0 L 180 0"
            strokeWidth={25}
            strokeLinecap="round"
          />

          <MotionPath
            d="M 210 0 L 300 0"
            strokeWidth={25}
            strokeLinecap="round"
          />

          <MotionPath
            d="M 330 0 L 400 0"
            strokeWidth={25}
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
  )
}

export function InitialLoading() {
  return (
    <motion.div
      key="initial-loading"
      className="w-full min-h-screen absolute bg-muted top-0 z-50 left-0 flex items-center flex-col py-14 px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <motion.svg
        width="100%"
        height="auto"
        className="max-w-4xl max-md:aspect-300/800"
        preserveAspectRatio="xMinYMin slice"
        fill="var(--primary)"
        viewBox="0 0 1000 1200"
        initial="hidden"
        animate="visible"
        transition={{
          delayChildren: stagger(0.1),
        }}
      >
        {/* Imagem */}
        <motion.circle
          cx={63}
          cy={63}
          r={60}
          fill="currentColor"
          className="animate-pulse duration-1000"
        />

        {/* Hero */}
        <g transform="translate(135, 40)">
          <MotionPath d="M 0 0 L 230 0" strokeWidth={30} />
          <MotionPath d="M 0 30 L 300 30" />
          <MotionPath d="M 0 55 L 170 55" />
        </g>

        {/* Sobre */}
        <g transform="translate(0, 195)">
          <MotionPath d="M 0 0 L 100 0" strokeWidth={25} />
          <MotionPath d="M 0 38 L 1000 38" />
          <MotionPath d="M 0 63 L 1000 63" />
          <MotionPath d="M 0 90 L 1000 90" />
          <MotionPath d="M 0 120 L 800 120" />
        </g>

        {/* Experiência profissional */}
        <g transform="translate(0, 420)">
          {/* Título */}
          <g transform="translate(0, 0)">
            <MotionPath d="M 0 0 L 175 0" strokeWidth={35} />
            <MotionPath d="M 185 0 L 350 0" strokeWidth={35} />
          </g>

          <Details showDescription />
          <Details y={220} showDescription />
        </g>

        {/* Educação */}
        <g transform="translate(0, 910)">
          {/* Título */}
          <g transform="translate(0, 0)">
            <MotionPath d="M 0 0 L 160 0" strokeWidth={35} />
          </g>

          <Details />
          <Details y={220} />
        </g>
      </motion.svg>
    </motion.div>
  )
}
