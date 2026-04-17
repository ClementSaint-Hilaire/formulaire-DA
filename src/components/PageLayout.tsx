import { ReactNode } from 'react'
import { Button } from './Button'
import { ButtonArrow } from './ButtonArrow'
import { ProgressBar } from './ProgressBar'

interface PageLayoutProps {
  title: string
  step?: number
  children: ReactNode
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

export function PageLayout({
  title,
  step = 0,
  children,
  onBack,
  onNext,
  nextLabel = 'Suivant',
  nextDisabled = false,
}: PageLayoutProps) {
  return (
    <div className="bg-white flex flex-col items-center min-h-screen w-full">
      <div className="flex flex-col flex-1 gap-16 items-start max-w-[800px] w-full px-6 py-20 md:py-32">
        <div className="flex gap-8 md:gap-16 items-center w-full shrink-0">
          <h2
            className="flex-1 min-w-0 text-[24px] md:text-[34px] font-semibold text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
            style={{ fontFeatureSettings: "'case' 1", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {title}
          </h2>
          <ProgressBar total={8} current={step} />
        </div>

        <div className="flex-1 flex flex-col gap-8 items-start w-full">
          {children}
        </div>

        <div className="flex items-center justify-between w-full shrink-0 mt-auto">
          {onBack ? (
            <ButtonArrow label="retour" direction="left" onClick={onBack} />
          ) : (
            <div />
          )}
          <Button label={nextLabel} iconEnd onClick={onNext} disabled={nextDisabled} />
        </div>
      </div>
    </div>
  )
}
