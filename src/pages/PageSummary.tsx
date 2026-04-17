import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { Button } from '../components'
import { FormData } from '../types'

interface PageSummaryProps {
  formData: FormData
  onBack: () => void
}

const logoStatusLabel: Record<string, string> = {
  oui: 'Oui — logo existant conservé',
  non: 'Non — création d\'un nouveau logo',
  'oui-changer': 'Oui — logo existant à refaire',
}

interface EditableFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  multiline?: boolean
}

function EditableField({ label, value, onChange, multiline = false }: EditableFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-[rgba(67,66,66,0.4)] font-medium">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="text-[13px] text-[#1D1D1F] leading-[1.5] bg-transparent border-b border-[rgba(67,66,66,0.15)] resize-none outline-none focus:border-[#1D1D1F] transition-colors w-full py-1"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          placeholder="—"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-[13px] text-[#1D1D1F] leading-[1.5] bg-transparent border-b border-[rgba(67,66,66,0.15)] outline-none focus:border-[#1D1D1F] transition-colors w-full py-1"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          placeholder="—"
        />
      )}
    </div>
  )
}

export function PageSummary({ formData, onBack }: PageSummaryProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const [fields, setFields] = useState({
    logoStatus: logoStatusLabel[formData.logoStatus ?? ''] ?? '',
    logoAime: formData.logoAime,
    logoNAimePas: formData.logoNAimePas,
    logoRaison: formData.logoRaison,
  })

  const update = (key: keyof typeof fields) => (val: string) =>
    setFields((f) => ({ ...f, [key]: val }))

  const handlePrint = () => {
    window.print()
  }

  const handleExportPNG = async () => {
    if (!pageRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(pageRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'synthese-DA.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-[#f0eeeb] min-h-screen w-full flex flex-col items-center py-12 px-4">
      {/* Export controls */}
      <div className="no-print flex items-center justify-between w-full max-w-[860px] mb-8 gap-4 flex-wrap">
        <Button label="← Retour" variant="secondary" onClick={onBack} />
        <div className="flex gap-3">
          <Button
            label="Exporter en PDF"
            variant="secondary"
            onClick={handlePrint}
            disabled={isExporting}
          />
          <Button
            label={isExporting ? 'Export…' : 'Exporter en PNG'}
            variant="primary"
            onClick={handleExportPNG}
            disabled={isExporting}
          />
        </div>
      </div>

      {/* A4 page */}
      <div
        ref={pageRef}
        id="summary-page"
        className="bg-white w-full max-w-[794px] min-h-[1123px] shadow-lg"
        style={{
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          padding: '64px 72px',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between pb-8 mb-10"
          style={{ borderBottom: '1.5px solid #1D1D1F' }}
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-widest text-[rgba(67,66,66,0.5)] mb-2 font-medium"
            >
              Iconokom
            </p>
            <h1
              className="text-[26px] font-semibold text-[#1D1D1F] leading-[1.2] tracking-[-0.03em]"
            >
              Direction artistique
              <br />&amp;&nbsp;éditoriale
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[rgba(67,66,66,0.4)]">
              {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Section 1 — Identité visuelle */}
        <section className="mb-10">
          <h2
            className="text-[11px] uppercase tracking-widest text-[rgba(67,66,66,0.5)] font-medium mb-6"
          >
            Identité visuelle existante
          </h2>

          <div className="flex flex-col gap-6">
            <EditableField
              label="Statut du logo"
              value={fields.logoStatus}
              onChange={update('logoStatus')}
            />

            {formData.logoDataUrl && (
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[rgba(67,66,66,0.4)] font-medium">
                  Logo actuel
                </span>
                <div
                  className="border border-[rgba(67,66,66,0.15)] rounded p-3 flex items-center justify-start"
                  style={{ height: '120px' }}
                >
                  <img
                    src={formData.logoDataUrl}
                    alt="Logo"
                    className="max-h-full max-w-[200px] object-contain"
                  />
                </div>
              </div>
            )}

            <EditableField
              label="Ce que nous aimons dans le logo"
              value={fields.logoAime}
              onChange={update('logoAime')}
              multiline
            />

            <EditableField
              label="Ce que nous n'aimons pas dans le logo"
              value={fields.logoNAimePas}
              onChange={update('logoNAimePas')}
              multiline
            />

            {formData.logoStatus !== 'oui' && (
              <EditableField
                label="Pourquoi il faut le changer"
                value={fields.logoRaison}
                onChange={update('logoRaison')}
                multiline
              />
            )}
          </div>
        </section>

        {/* Section 2 — Ambiance & ressenti */}
        <section className="mb-10">
          <h2
            className="text-[11px] uppercase tracking-widest text-[rgba(67,66,66,0.5)] font-medium mb-6"
            style={{ borderTop: '1.5px solid rgba(67,66,66,0.12)', paddingTop: '32px' }}
          >
            Ambiance &amp; ressenti
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { left: 'Traditionnel', right: 'Moderne',     value: formData.ambianceTraditionnelModerne },
              { left: 'Minimaliste',  right: 'Maximaliste', value: formData.ambianceMinimalisteMaximaliste },
              { left: 'Sérieux',      right: 'Playfull',    value: formData.ambianceSérieuxPlayfull },
              { left: 'Formel',       right: 'Informel',    value: formData.ambianceFormelInformel },
              { left: 'Luxeux',       right: 'Abordable',   value: formData.ambianceLuxeuxAbordable },
              { left: 'Inclusif',     right: 'Exclusif',    value: formData.ambianceInclusifExclusif },
              { left: 'Discret',      right: 'Affirmé',     value: formData.ambianceDiscretAffirme },
            ].map(({ left, right, value }) => (
              <div key={left} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] text-[rgba(67,66,66,0.5)] tracking-wide">
                  <span>{left}</span>
                  <span>{right}</span>
                </div>
                <div className="relative h-[6px] bg-[#f0eeeb] rounded-full">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#1D1D1F] rounded-full"
                    style={{ width: `${value}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-white rounded-full border border-[rgba(67,66,66,0.2)] shadow-sm"
                    style={{ left: `calc(${value}% - 7px)` }}
                  />
                </div>
              </div>
            ))}

            {formData.ambianceInfoComplementaires && (
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[10px] uppercase tracking-widest text-[rgba(67,66,66,0.4)] font-medium">
                  Informations complémentaires
                </span>
                <p className="text-[13px] text-[#1D1D1F] leading-[1.5]">
                  {formData.ambianceInfoComplementaires}
                </p>
              </div>
            )}
          </div>
        </section>

        <div
          className="pt-8 mt-auto"
          style={{ borderTop: '1px solid rgba(67,66,66,0.1)' }}
        >
          <p className="text-[10px] text-[rgba(67,66,66,0.3)]">
            Document généré par Iconokom — formulaire de direction artistique &amp; éditoriale
          </p>
        </div>
      </div>
    </div>
  )
}
