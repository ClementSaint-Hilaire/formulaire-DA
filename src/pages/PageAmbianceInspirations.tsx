import { FormData } from '../types'

interface PageAmbianceInspirationsProps {
  formData: FormData
  onUpdate: (updates: Partial<FormData>) => void
}

export function PageAmbianceInspirations({ formData, onUpdate }: PageAmbianceInspirationsProps) {
  const inspirations = formData.ambianceInspirations

  const updateEntry = (index: number, field: 'lien' | 'justification', value: string) => {
    const next = inspirations.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    )
    onUpdate({ ambianceInspirations: next })
  }

  const addEntry = () => {
    onUpdate({ ambianceInspirations: [...inspirations, { lien: '', justification: '' }] })
  }

  const removeEntry = (index: number) => {
    onUpdate({ ambianceInspirations: inspirations.filter((_, i) => i !== index) })
  }

  return (
    <div className="flex flex-col gap-8">
      <p
        className="text-[16px] md:text-[18px] text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        Avez-vous des sites, marques ou visuels que vous aimez même hors de votre secteur&nbsp;?
      </p>

      <div className="flex flex-col gap-4">
        {inspirations.map((entry, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                className="text-[13px] text-[#1D1D1F] leading-[1.2] tracking-[-0.01em]"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                Lien du site
              </label>
              <input
                type="url"
                placeholder="https://nom@domain.fr"
                value={entry.lien}
                onChange={(e) => updateEntry(index, 'lien', e.target.value)}
                className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em] w-full max-w-[302px]"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              />
            </div>

            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1 flex-1 max-w-[302px]">
                <label
                  className="text-[13px] text-[#1D1D1F] leading-[1.2] tracking-[-0.01em]"
                  style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                  Justification
                </label>
                <input
                  type="text"
                  placeholder="Entrer le texte ici"
                  value={entry.justification}
                  onChange={(e) => updateEntry(index, 'justification', e.target.value)}
                  className="h-[38px] bg-[#f7f5f5] rounded-lg px-3 text-[13px] text-[#1D1D1F] placeholder:text-[rgba(67,66,66,0.35)] outline-none tracking-[-0.01em] w-full"
                  style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                />
              </div>

              {inspirations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="h-[38px] w-[38px] flex items-center justify-center rounded-lg border border-[rgba(67,66,66,0.6)] text-[rgba(67,66,66,0.6)] hover:border-[#1D1D1F] hover:text-[#1D1D1F] transition-colors shrink-0"
                  aria-label="Supprimer cette référence"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEntry}
          className="w-[38px] h-[38px] flex items-center justify-center rounded-lg border border-[rgba(67,66,66,0.6)] text-[rgba(67,66,66,0.6)] hover:border-[#1D1D1F] hover:text-[#1D1D1F] transition-colors"
          aria-label="Ajouter une référence"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
