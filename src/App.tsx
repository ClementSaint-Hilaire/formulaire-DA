import { useState, useCallback, ReactNode } from 'react'
import { Step, FormData, initialFormData } from './types'
import { Button, ButtonArrow, ProgressBar } from './components'
import { PageIntro } from './pages/PageIntro'
import { PageLogoQuestion } from './pages/PageLogoQuestion'
import { PageLogoOui } from './pages/PageLogoOui'
import { PageLogoNon } from './pages/PageLogoNon'
import { PageLogoChanger } from './pages/PageLogoChanger'
import { PageAmbiance } from './pages/PageAmbiance'
import { PageAmbianceInspirations } from './pages/PageAmbianceInspirations'
import { PageAmbianceStyles } from './pages/PageAmbianceStyles'
import { PageCouleurs } from './pages/PageCouleurs'
import { PageCouleursEviter } from './pages/PageCouleursEviter'
import { PageCouleursTheme } from './pages/PageCouleursTheme'
import { PageTypographie } from './pages/PageTypographie'
import { PageSummary } from './pages/PageSummary'

type Direction = 'forward' | 'backward'

const FORM_STEPS: Step[] = ['logo-question', 'logo-oui', 'logo-non', 'logo-changer', 'ambiance', 'ambiance-inspirations', 'ambiance-styles', 'couleurs', 'couleurs-eviter', 'couleurs-theme', 'typographie']

interface StepMeta {
  title: string
  stepIndex: number
}

const STEP_META: Partial<Record<Step, StepMeta>> = {
  'logo-question': { title: 'Identité visuelle existante', stepIndex: 0 },
  'logo-oui':      { title: 'Identité visuelle existante', stepIndex: 0 },
  'logo-non':      { title: 'Identité visuelle existante', stepIndex: 0 },
  'logo-changer':  { title: 'Identité visuelle existante', stepIndex: 0 },
  'ambiance':               { title: 'Ambiance & ressenti', stepIndex: 1 },
  'ambiance-inspirations':  { title: 'Ambiance & ressenti', stepIndex: 1 },
  'ambiance-styles':        { title: 'Ambiance & ressenti', stepIndex: 1 },
  'couleurs':               { title: 'Couleurs',            stepIndex: 2 },
  'couleurs-eviter':        { title: 'Couleurs',            stepIndex: 2 },
  'couleurs-theme':         { title: 'Couleurs',            stepIndex: 2 },
  'typographie':            { title: 'Typographie',         stepIndex: 3 },
}

// Shell wrapping form steps: header + animated content + footer are split
interface FormShellProps {
  title: string
  stepIndex: number
  onBack?: () => void
  onNext: () => void
  nextDisabled?: boolean
  children: ReactNode
  animKey: number
  direction: Direction
}

function FormShell({
  title,
  stepIndex,
  onBack,
  onNext,
  nextDisabled,
  children,
  animKey,
  direction,
}: FormShellProps) {
  return (
    <div
      className="bg-white flex flex-col items-center min-h-screen w-full"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="flex flex-col flex-1 w-full max-w-[800px] px-6 py-20 md:py-32 gap-16">

        {/* ── Header : titre + progress indicator — ne slide JAMAIS ─── */}
        <div className="flex gap-8 md:gap-16 items-center w-full shrink-0">
          <h2
            className="flex-1 min-w-0 text-[24px] md:text-[34px] font-semibold text-[#1D1D1F] leading-[1.2] tracking-[-0.02em]"
            style={{ fontFeatureSettings: "'case' 1" }}
          >
            {title}
          </h2>
          <ProgressBar total={8} current={stepIndex} />
        </div>

        {/* ── Contenu : seul élément animé ─────────────────────────── */}
        <div className="flex-1 overflow-hidden">
          <div
            key={animKey}
            className={direction === 'forward' ? 'anim-slide-right' : 'anim-slide-left'}
          >
            {children}
          </div>
        </div>

        {/* ── Footer : boutons retour / suivant — ne slide JAMAIS ──── */}
        <div className="flex items-center justify-between w-full shrink-0">
          {onBack ? (
            <ButtonArrow label="retour" direction="left" onClick={onBack} />
          ) : (
            <div />
          )}
          <Button label="Suivant" iconEnd onClick={onNext} disabled={nextDisabled} />
        </div>

      </div>
    </div>
  )
}

export default function App() {
  const [step, setStep]           = useState<Step>('intro')
  const [direction, setDirection] = useState<Direction>('forward')
  const [animKey, setAnimKey]     = useState(0)
  const [formData, setFormData]   = useState<FormData>(initialFormData)

  const navigate = useCallback((nextStep: Step, dir: Direction = 'forward') => {
    setDirection(dir)
    setAnimKey((k) => k + 1)
    setStep(nextStep)
  }, [])

  const updateForm = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  const logoDetailStep = (data: FormData): Step => {
    if (data.logoStatus === 'oui')       return 'logo-oui'
    if (data.logoStatus === 'non')       return 'logo-non'
    if (data.logoStatus === 'oui-changer') return 'logo-changer'
    return 'logo-oui'
  }

  // ── Intro : page entière animée ──────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="overflow-x-hidden">
        <div key={animKey} className={direction === 'forward' ? 'anim-slide-right' : 'anim-slide-left'}>
          <PageIntro onNext={() => navigate('logo-question')} />
        </div>
      </div>
    )
  }

  // ── Summary : page entière animée ───────────────────────────────────
  if (step === 'summary') {
    return (
      <div className="overflow-x-hidden">
        <div key={animKey} className={direction === 'forward' ? 'anim-slide-right' : 'anim-slide-left'}>
          <PageSummary
            formData={formData}
            onBack={() => navigate('couleurs-theme', 'backward')}
          />
        </div>
      </div>
    )
  }

  // ── Étapes du formulaire : shell fixe, seul le contenu slide ────────
  if (FORM_STEPS.includes(step)) {
    const meta = STEP_META[step]!

    const navConfig = (() => {
      switch (step) {
        case 'logo-question':
          return {
            onBack: () => navigate('intro', 'backward'),
            onNext: () => navigate(logoDetailStep(formData)),
            nextDisabled: !formData.logoStatus,
          }
        case 'logo-oui':
          return {
            onBack: () => navigate('logo-question', 'backward'),
            onNext: () => navigate('ambiance'),
          }
        case 'logo-non':
          return {
            onBack: () => navigate('logo-question', 'backward'),
            onNext: () => navigate('ambiance'),
          }
        case 'logo-changer':
          return {
            onBack: () => navigate('logo-question', 'backward'),
            onNext: () => navigate('ambiance'),
          }
        case 'ambiance':
          return {
            onBack: () => navigate(logoDetailStep(formData), 'backward'),
            onNext: () => navigate('ambiance-inspirations'),
          }
        case 'ambiance-inspirations':
          return {
            onBack: () => navigate('ambiance', 'backward'),
            onNext: () => navigate('ambiance-styles'),
          }
        case 'ambiance-styles':
          return {
            onBack: () => navigate('ambiance-inspirations', 'backward'),
            onNext: () => navigate('couleurs'),
          }
        case 'couleurs':
          return {
            onBack: () => navigate('ambiance-styles', 'backward'),
            onNext: () => navigate('couleurs-eviter'),
          }
        case 'couleurs-eviter':
          return {
            onBack: () => navigate('couleurs', 'backward'),
            onNext: () => navigate('couleurs-theme'),
          }
        case 'couleurs-theme':
          return {
            onBack: () => navigate('couleurs-eviter', 'backward'),
            onNext: () => navigate('typographie'),
          }
        case 'typographie':
          return {
            onBack: () => navigate('couleurs-theme', 'backward'),
            onNext: () => navigate('summary'),
          }
        default:
          return { onNext: () => {} }
      }
    })()

    const renderContent = () => {
      switch (step) {
        case 'logo-question':
          return <PageLogoQuestion formData={formData} onUpdate={updateForm} />
        case 'logo-oui':
          return <PageLogoOui formData={formData} onUpdate={updateForm} />
        case 'logo-non':
          return <PageLogoNon formData={formData} onUpdate={updateForm} />
        case 'logo-changer':
          return <PageLogoChanger formData={formData} onUpdate={updateForm} />
        case 'ambiance':
          return <PageAmbiance formData={formData} onUpdate={updateForm} />
        case 'ambiance-inspirations':
          return <PageAmbianceInspirations formData={formData} onUpdate={updateForm} />
        case 'ambiance-styles':
          return <PageAmbianceStyles formData={formData} onUpdate={updateForm} />
        case 'couleurs':
          return <PageCouleurs formData={formData} onUpdate={updateForm} />
        case 'couleurs-eviter':
          return <PageCouleursEviter formData={formData} onUpdate={updateForm} />
        case 'couleurs-theme':
          return <PageCouleursTheme formData={formData} onUpdate={updateForm} />
        case 'typographie':
          return <PageTypographie formData={formData} onUpdate={updateForm} />
        default:
          return null
      }
    }

    return (
      <FormShell
        title={meta.title}
        stepIndex={meta.stepIndex}
        animKey={animKey}
        direction={direction}
        {...navConfig}
      >
        {renderContent()}
      </FormShell>
    )
  }

  return null
}
