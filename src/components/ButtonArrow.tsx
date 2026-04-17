import { ButtonHTMLAttributes } from 'react'

type Direction = 'left' | 'right'

interface ButtonArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  direction?: Direction
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13 4l-6 6 6 6" stroke="#1D1D1F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 4l6 6-6 6" stroke="#1D1D1F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ButtonArrow({
  label,
  direction = 'right',
  className = '',
  ...props
}: ButtonArrowProps) {
  return (
    <button
      className={[
        'inline-flex items-center gap-1 p-2 text-[14px] text-[#1D1D1F]',
        'hover:opacity-70 transition-opacity duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className,
      ].join(' ')}
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.01em',
      }}
      {...props}
    >
      {direction === 'left' && <ArrowLeft />}
      <span>{label}</span>
      {direction === 'right' && <ArrowRight />}
    </button>
  )
}
