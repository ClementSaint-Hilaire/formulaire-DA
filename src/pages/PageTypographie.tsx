import { FormData } from '../types'

interface Props {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

const TYPOGRAPHY_CHOICES = [
  'Sérieuses et classiques',
  'Modernes et épurées',
  'Expressives et originales',
]

export function PageTypographie({ formData, onUpdate }: Props) {
  const selected = formData.typographieStyles

  const toggle = (label: string) => {
    const next = selected.includes(label)
      ? selected.filter((s) => s !== label)
      : [...selected, label]
    onUpdate({ typographieStyles: next })
  }

  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Êtes-vous plutôt attiré par des polices
      </p>

      <div className="flex flex-col gap-3">
        {TYPOGRAPHY_CHOICES.map((label) => {
          const isSelected = selected.includes(label)
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggle(label)}
              className={`
                px-3 py-2 rounded-lg text-[14px] leading-[1.2] tracking-[-0.01em] text-left transition-all duration-150
                ${isSelected
                  ? 'bg-[#1D1D1F] text-[#f7f5f5] font-medium'
                  : 'bg-[#e5e5e5] text-[#1D1D1F]'
                }
              `}
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
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
          placeholder="ou nom de la police"
          value={formData.typographieInfos}
          onChange={(e) => onUpdate({ typographieInfos: e.target.value })}
          className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        />
      </div>
    </div>
  )
}
