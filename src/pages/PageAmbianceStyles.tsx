import { FormData } from '../types'

interface PageAmbianceStylesProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

const STYLES = [
  'corporate',
  'flashy',
  'japandi',
  'bauhaus',
  'swiss design',
  'brutaliste',
  'minimal luxe',
  'futuriste / tech',
]

export function PageAmbianceStyles({ formData, onUpdate }: PageAmbianceStylesProps) {
  const selected = formData.ambianceStylesExclus

  const toggle = (style: string) => {
    const next = selected.includes(style)
      ? selected.filter((s) => s !== style)
      : [...selected, style]
    onUpdate({ ambianceStylesExclus: next })
  }

  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Y a-t-il des styles, effets ou univers visuels que vous ne voulez surtout pas&nbsp;?
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STYLES.map((style) => {
          const isSelected = selected.includes(style)
          return (
            <button
              key={style}
              type="button"
              onClick={() => toggle(style)}
              className="flex flex-col gap-2 items-start text-left group"
            >
              <div
                className={`
                  relative w-full aspect-[3/4] rounded-lg overflow-hidden
                  bg-[#f0efed] transition-all duration-200
                  ${isSelected ? 'ring-2 ring-[#1D1D1F]' : 'ring-1 ring-transparent'}
                `}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-[#1D1D1F]/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#1D1D1F] flex items-center justify-center">
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <span
                className={`text-[14px] md:text-[18px] leading-[1.2] tracking-[-0.02em] transition-colors
                  ${isSelected ? 'text-[#1D1D1F] font-medium' : 'text-[#1D1D1F]'}
                `}
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                {style}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
