interface ProgressBarProps {
  total?: number
  current: number
}

export function ProgressBar({ total = 8, current }: ProgressBarProps) {
  return (
    <div className="flex gap-1 items-center shrink-0">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full w-2 h-2 shrink-0 transition-colors duration-300"
          style={{
            backgroundColor: i <= current ? '#1D1D1F' : 'rgba(67,66,66,0.2)',
          }}
        />
      ))}
    </div>
  )
}
