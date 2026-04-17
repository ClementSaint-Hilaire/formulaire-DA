import { FormData } from '../types'

interface PageCouleursProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

const SLIDERS: {
  left: string
  right: string
  leftImg: string
  rightImg: string
  field: keyof FormData
  large?: boolean
}[] = [
  {
    left: 'Chaud',
    right: 'Froid',
    leftImg: '/couleurs/chaud.png',
    rightImg: '/couleurs/froid.png',
    field: 'couleurChaudFroid',
    large: true,
  },
  {
    left: 'Pastel',
    right: 'Saturé',
    leftImg: '/couleurs/pastel.png',
    rightImg: '/couleurs/saturé.png',
    field: 'couleurPastelSature',
  },
  {
    left: 'Terne',
    right: 'Flashy',
    leftImg: '/couleurs/terne.png',
    rightImg: '/couleurs/flashy.png',
    field: 'couleurTerneFlashy',
  },
]

export function PageCouleurs({ formData, onUpdate }: PageCouleursProps) {
  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Avez-vous une direction couleur en tête&nbsp;?
      </p>

      <div className="flex flex-col gap-6 w-full">
        {SLIDERS.map(({ left, right, leftImg, rightImg, field, large }) => {
          const value = formData[field] as number
          const leftOpacity = Math.max(0.15, (100 - value) / 100)
          const rightOpacity = Math.max(0.15, value / 100)
          const imgH = large ? 'h-[88px] md:h-[120px]' : 'h-[88px]'
          const imgW = large ? 'flex-1 min-w-0' : 'w-[140px] md:w-[176px] shrink-0'

          return (
            <div key={String(field)} className="flex gap-4 md:gap-6 items-center w-full">
              <div
                className={`${imgW} ${imgH} rounded-lg overflow-hidden transition-opacity duration-200`}
                style={{ opacity: leftOpacity }}
              >
                <img src={leftImg} alt={left} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-col flex-1 min-w-0 gap-2 py-4">
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

              <div
                className={`${imgW} ${imgH} rounded-lg overflow-hidden transition-opacity duration-200`}
                style={{ opacity: rightOpacity }}
              >
                <img src={rightImg} alt={right} className="w-full h-full object-cover" />
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
          value={formData.couleurInfoComplementaires}
          onChange={(e) => onUpdate({ couleurInfoComplementaires: e.target.value })}
          className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        />
      </div>
    </div>
  )
}
