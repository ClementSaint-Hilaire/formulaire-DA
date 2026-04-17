import { InputHTMLAttributes, useRef } from 'react'

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  placeholder?: string
  helpText?: string
  showHelpText?: boolean
  previewUrl?: string | null
  onFileChange?: (file: File, dataUrl: string) => void
}

export function FileUpload({
  label,
  placeholder = 'Importer votre image ici',
  helpText,
  showHelpText = true,
  previewUrl,
  onFileChange,
  accept,
  className = '',
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onFileChange) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      onFileChange(file, dataUrl)
    }
    reader.readAsDataURL(file)
  }

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
      <div
        className={[
          'rounded-lg border-2 border-dashed border-[#CDCDCD] px-3 py-2 h-[128px]',
          'flex items-center justify-center cursor-pointer overflow-hidden',
          'hover:border-[#1D1D1F] transition-colors duration-150',
          className,
        ].join(' ')}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Aperçu du logo"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span
            className="text-[14px] text-[rgba(67,66,66,0.35)] text-center"
            style={{ letterSpacing: '-0.01em' }}
          >
            {placeholder}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
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
