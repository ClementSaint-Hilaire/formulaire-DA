import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: Variant
  size?: Size
  iconStart?: boolean
  iconEnd?: boolean
}

const sizeStyles: Record<Size, string> = {
  small: 'px-3 py-1.5 text-[12px] gap-1',
  medium: 'px-3 py-2 text-[14px] gap-1',
  large: 'px-4 py-2.5 text-[16px] gap-1.5',
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[#1D1D1F] text-[#F7F5F5] hover:bg-[#2d2d30]',
  secondary: 'bg-transparent text-[#1D1D1F] border border-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-[#F7F5F5]',
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 8h8M8 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  iconStart = false,
  iconEnd = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const iconColor = variant === 'primary' ? '#F7F5F5' : '#1D1D1F'

  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center rounded-lg font-medium transition-colors duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        sizeStyles[size],
        variantStyles[variant],
        className,
      ].join(' ')}
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      {...props}
    >
      {iconStart && <StarIcon color={iconColor} />}
      <span>{label}</span>
      {iconEnd && <ArrowIcon color={iconColor} />}
    </button>
  )
}
