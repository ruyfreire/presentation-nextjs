export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col gap-10 max-w-4xl mx-auto px-4">
      {children}
    </div>
  )
}
