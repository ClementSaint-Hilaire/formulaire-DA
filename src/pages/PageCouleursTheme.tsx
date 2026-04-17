import { FormData } from '../types'

interface Props {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

type ThemeOption = 'sombre' | 'claire' | 'alternance'

const OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: 'sombre',      label: 'Thème sombre' },
  { value: 'claire',      label: 'Thème claire' },
  { value: 'alternance',  label: 'Alternance des deux' },
]

export function PageCouleursTheme({ formData, onUpdate }: Props) {
  const toggle = (value: ThemeOption) => {
    onUpdate({ couleurTheme: formData.couleurTheme === value ? null : value })
  }

  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Préférence pour un thème en particulier&nbsp;?
      </p>

      <div className="flex flex-col gap-2">
        {OPTIONS.map(({ value, label }) => {
          const active = formData.couleurTheme === value
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              className="self-start px-3 py-2 rounded-lg text-[13px] leading-[1.2] tracking-[-0.01em] transition-colors"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: 500,
                backgroundColor: active ? '#1D1D1F' : '#e5e5e5',
                color: active ? '#f7f5f5' : '#1D1D1F',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-1 w-full max-w-[400px]">
        <label
          className="text-[13px] text-[#1D1D1F] leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Informations complémentaires
        </label>
        <input
          type="text"
          placeholder="Texte ici"
          value={formData.couleurThemeInfos}
          onChange={(e) => onUpdate({ couleurThemeInfos: e.target.value })}
          className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        />
      </div>
    </div>
  )
}
