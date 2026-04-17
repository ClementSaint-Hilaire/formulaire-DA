import { Button } from '../components'

interface PageIntroProps {
  onNext: () => void
}

export function PageIntro({ onNext }: PageIntroProps) {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen w-full">
      <div className="flex flex-col flex-1 gap-16 items-start max-w-[800px] w-full px-6 py-20 md:py-32">
        <h1
          className="text-[32px] md:text-[43px] font-semibold text-[#1D1D1F] leading-[1.2] tracking-[-0.03em] w-full"
          style={{
            fontFeatureSettings: "'case' 1",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            letterSpacing: '-1.29px',
          }}
        >
          Formulaire de direction artistique{' '}
          <br className="hidden md:block" />
          &amp;&nbsp;éditoriale
        </h1>

        <p
          className="text-[16px] md:text-[18px] text-[rgba(67,66,66,0.6)] leading-[1.2] tracking-[-0.02em] flex-1"
          style={{
            fontFeatureSettings: "'case' 1",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          L&apos;objectif de ce formulaire est de déterminer ensemble l&apos;esthétique
          visuel et éditoriale de votre marque comme de votre site.
          <br /><br />
          Bien qu&apos;une marque ne se construise pas sur des goûts mais sur une
          stratégie, nous prenons à cœur le fait qu&apos;elle vous ressemble afin que
          vous l&apos;incarniez au mieux.
        </p>

        <div className="flex justify-end w-full">
          <Button label="Commençons" iconEnd onClick={onNext} />
        </div>
      </div>
    </div>
  )
}
