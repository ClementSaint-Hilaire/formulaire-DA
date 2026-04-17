import { Button, ButtonArrow, Input, FileUpload } from './components'

export default function App() {
  return (
    <div className="min-h-screen bg-white p-10 flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-[rgba(67,66,66,0.5)]">Button</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <Button label="Suivant" iconStart iconEnd />
          <Button label="Suivant" variant="secondary" iconEnd />
          <Button label="Petit" size="small" iconEnd />
          <Button label="Grand" size="large" iconEnd />
          <Button label="Désactivé" disabled iconEnd />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-[rgba(67,66,66,0.5)]">Button Arrow</h2>
        <div className="flex items-center gap-4">
          <ButtonArrow label="Suivant" direction="right" />
          <ButtonArrow label="Retour" direction="left" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-[rgba(67,66,66,0.5)]">Input</h2>
        <div className="max-w-[400px] flex flex-col gap-4">
          <Input
            label="Ce que nous aimons dans le logo"
            placeholder="Entrer le texte ici"
          />
          <Input
            label="Avec texte d'aide"
            placeholder="Entrer le texte ici"
            helpText="Maximum 200 caractères"
            showHelpText
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-[rgba(67,66,66,0.5)]">File Upload</h2>
        <div className="max-w-[400px]">
          <FileUpload
            label="Importer le logo ici"
            placeholder="Importer votre image ici"
            helpText="PNG, JPEG"
            showHelpText
            accept="image/png, image/jpeg"
          />
        </div>
      </section>
    </div>
  )
}
