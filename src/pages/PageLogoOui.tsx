import { FileUpload, Input } from '../components'
import { FormData } from '../types'

interface PageLogoOuiProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PageLogoOui({ formData, onUpdate }: PageLogoOuiProps) {
  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Disposez-vous déjà d&apos;un logo&nbsp;?
      </p>

      <div className="flex flex-col gap-6 w-full max-w-[400px]">
        <FileUpload
          label="Importer le logo ici"
          placeholder="Importer votre image ici"
          helpText="PNG, JPEG"
          showHelpText
          accept="image/png, image/jpeg"
          previewUrl={formData.logoDataUrl}
          onFileChange={(file, dataUrl) =>
            onUpdate({ logoFile: file, logoDataUrl: dataUrl })
          }
        />

        <Input
          label="Ce que nous aimons dans le logo"
          placeholder="Entrer le texte ici"
          value={formData.logoAime}
          onChange={(e) => onUpdate({ logoAime: e.target.value })}
        />

        <Input
          label="Ce que nous n'aimons pas dans le logo"
          placeholder="Entrer le texte ici"
          value={formData.logoNAimePas}
          onChange={(e) => onUpdate({ logoNAimePas: e.target.value })}
        />
      </div>
    </div>
  )
}
