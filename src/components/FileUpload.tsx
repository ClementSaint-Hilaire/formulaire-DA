import { InputHTMLAttributes, useRef } from 'react'

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  placeholder?: string
  helpText?: string
  showHelpText?: boolean
}

export function FileUpload({
  label,
  placeholder = 'Importer votre image ici',
  helpText,
  showHelpText = true,
  accept,
  onChange,
  className = '',
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="flex flex-col gap-1 w-full"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <label
        className="text-[14px] text-[#1D1D1F]"
        style={{ letterSpacing: '-0.01em' }}
      >
        {label}
      </label>
      <div
        className={[
          'rounded-lg border-2 border-[#CDCDCD] px-3 py-2 h-[128px]',
          'flex items-center justify-center cursor-pointer',
          'hover:border-[#1D1D1F] transition-colors duration-150',
          className,
        ].join(' ')}
        onClick={() => inputRef.current?.click()}
      >
        <span
          className="text-[14px] text-[rgba(67,66,66,0.35)] text-center"
          style={{ letterSpacing: '-0.01em' }}
        >
          {placeholder}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
          {...props}
        />
      </div>
      {showHelpText && helpText && (
        <span className="text-[11px] text-[rgba(67,66,66,0.35)]">{helpText}</span>
      )}
    </div>
  )
}
