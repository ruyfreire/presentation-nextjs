import { VisuallyHidden } from 'radix-ui'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

const LoadingDialog = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Aviso de conexão</DialogTitle>
            <DialogDescription>
              Esperando a conexão com o servidor...
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>

        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-60 h-60 text-primary"
          >
            <path d="M12 17v4" />

            {/* engrenagem */}
            <g className="animate-[spin_3s_linear_infinite] origin-center transform-fill stroke-muted-foreground scale-125">
              <path d="m14.305 7.53.923-.382" />
              <path d="m15.228 4.852-.923-.383" />
              <path d="m16.852 3.228-.383-.924" />
              <path d="m16.852 8.772-.383.923" />
              <path d="m19.148 3.228.383-.924" />
              <path d="m19.53 9.696-.382-.924" />
              <path d="m20.772 4.852.924-.383" />
              <path d="m20.772 7.148.924.383" />
              <circle cx="18" cy="6" r="3" />
            </g>

            <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <path d="M8 21h8" />
          </svg>

          <p className="text-center text-xl font-bold">Ligando servidores...</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { LoadingDialog }
