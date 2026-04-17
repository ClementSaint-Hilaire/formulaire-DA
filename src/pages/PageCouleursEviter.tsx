import { FormData } from '../types'

interface Props {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PageCouleursEviter({ formData, onUpdate }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Y a-t-il des couleurs à éviter absolument&nbsp;?
      </p>

      <div className="flex flex-col gap-1 w-full max-w-[400px]">
        <label
          className="text-[13px] text-[#1D1D1F] leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Nom ou codes hexadécimaux
        </label>
        <input
          type="text"
          placeholder="Texte ici"
          value={formData.couleurCouleursEviter}
          onChange={(e) => onUpdate({ couleurCouleursEviter: e.target.value })}
          className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em]"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        />
      </div>
    </div>
  )
}
