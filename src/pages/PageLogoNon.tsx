import { Input } from '../components'
import { FormData } from '../types'

interface PageLogoNonProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PageLogoNon({ formData, onUpdate }: PageLogoNonProps) {
  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Que souhaitez vous qu'il représente ?
      </p>

      <div className="flex flex-col gap-1 w-full max-w-[400px]">
        <Input
          label="Ce que nous aimerions"
          placeholder="Entrer le texte ici"
          value={formData.logoAimerions}
          onChange={(e) => onUpdate({ logoAimerions: e.target.value })}
        />
      </div>
    </div>
  )
}
