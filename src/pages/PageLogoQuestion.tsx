import { Button } from '../components'
import { FormData, LogoStatus } from '../types'

interface PageLogoQuestionProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

const choices: { value: LogoStatus; label: string }[] = [
  { value: 'oui', label: 'Oui' },
  { value: 'non', label: 'Non' },
  { value: 'oui-changer', label: 'Oui mais je souhaite le changer' },
]

export function PageLogoQuestion({ formData, onUpdate }: PageLogoQuestionProps) {
  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Disposez-vous déjà d&apos;un logo&nbsp;?
      </p>

      <div className="flex flex-col gap-3">
        {choices.map(({ value, label }) => (
          <Button
            key={value}
            label={label}
            variant={formData.logoStatus === value ? 'primary' : 'secondary'}
            onClick={() => onUpdate({ logoStatus: value })}
          />
        ))}
      </div>
    </div>
  )
}
