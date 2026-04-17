import { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  helpText?: string
  showHelpText?: boolean
}

export function Input({
  label,
  helpText,
  showHelpText = false,
  placeholder = 'Entrer le texte ici',
  className = '',
  ...props
}: InputProps) {
  return (
    <div
      className="flex flex-col gap-1 w-full"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <label
        className="text-[14px] text-[#1D1D1F]"
        style={{ letterSpacing: '-0.01em' }}
      >
        {label}
      </label>
      <div className="rounded-lg bg-[#F7F5F5] px-3 py-2 flex items-center">
        <input
          className={[
            'w-full bg-transparent text-[14px] text-[#1D1D1F]',
            'placeholder:text-[rgba(67,66,66,0.35)] outline-none',
            className,
          ].join(' ')}
          style={{ letterSpacing: '-0.01em' }}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {showHelpText && helpText && (
        <span className="text-[11px] text-[rgba(67,66,66,0.35)]">{helpText}</span>
      )}
    </div>
  )
}
