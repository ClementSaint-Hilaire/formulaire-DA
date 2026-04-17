import { FormData } from '../types'

interface PageAmbianceProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

const SLIDERS: {
  label: string
  left: string
  right: string
  field: keyof FormData
}[] = [
  { label: 'traditionnel-moderne',  left: 'Traditionnel', right: 'Moderne',     field: 'ambianceTraditionnelModerne' },
  { label: 'minimaliste-max',        left: 'Minimaliste',  right: 'Maximaliste', field: 'ambianceMinimalisteMaximaliste' },
  { label: 'serieux-playfull',       left: 'Sérieux',      right: 'Playfull',    field: 'ambianceSérieuxPlayfull' },
  { label: 'formel-informel',        left: 'Formel',       right: 'Informel',    field: 'ambianceFormelInformel' },
  { label: 'luxeux-abordable',       left: 'Luxeux',       right: 'Abordable',   field: 'ambianceLuxeuxAbordable' },
  { label: 'inclusif-exclusif',      left: 'Inclusif',     right: 'Exclusif',    field: 'ambianceInclusifExclusif' },
  { label: 'discret-affirme',        left: 'Discret',      right: 'Affirmé',     field: 'ambianceDiscretAffirme' },
]

export function PageAmbiance({ formData, onUpdate }: PageAmbianceProps) {
  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Comment souhaitez-vous que votre site soit perçu&nbsp;?
      </p>

      <div className="flex flex-col w-full max-w-[400px] gap-[-24px] self-center">
        {SLIDERS.map(({ label, left, right, field }) => {
          const value = formData[field] as number
          return (
            <div key={label} className="flex flex-col gap-2 py-[-16px]">
              <div className="flex items-center justify-between text-[13px] text-[rgba(67,66,66,0.6)] tracking-[-0.01em] whitespace-nowrap">
                <span>{left}</span>
                <span>{right}</span>
              </div>
              <div className="relative h-[38px] flex items-center">
                <div className="absolute inset-x-0 h-[4px] rounded-full bg-[#f7f5f5]">
                  <div
                    className="h-full rounded-full bg-[#1D1D1F] transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => onUpdate({ [field]: Number(e.target.value) })}
                  className="ambiance-slider absolute inset-x-0 h-full opacity-0 cursor-pointer"
                />
                <div
                  className="absolute w-[48px] h-[32px] rounded-full bg-white shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] pointer-events-none transition-all"
                  style={{ left: `calc(${value}% - ${value * 0.48}px)` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-1 w-full max-w-[400px] self-center">
        <label
          className="text-[13px] text-[#1D1D1F] leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Informations complémentaires
        </label>
        <input
          type="text"
          placeholder="Texte ici"
          value={formData.ambianceInfoComplementaires}
          onChange={(e) => onUpdate({ ambianceInfoComplementaires: e.target.value })}
          className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        />
      </div>
    </div>
  )
}
