export type LogoStatus = 'oui' | 'non' | 'oui-changer' | null

export type Step =
  | 'intro'
  | 'logo-question'
  | 'logo-oui'
  | 'logo-non'
  | 'logo-changer'
  | 'ambiance'
  | 'ambiance-inspirations'
  | 'ambiance-styles'
  | 'couleurs'
  | 'couleurs-eviter'
  | 'couleurs-theme'
  | 'typographie'
  | 'summary'

export interface FormData {
  logoStatus: LogoStatus
  logoFile: File | null
  logoDataUrl: string | null
  logoAime: string
  logoNAimePas: string
  logoRaison: string
  logoAimerions: string
  ambianceTraditionnelModerne: number
  ambianceMinimalisteMaximaliste: number
  ambianceSérieuxPlayfull: number
  ambianceFormelInformel: number
  ambianceLuxeuxAbordable: number
  ambianceInclusifExclusif: number
  ambianceDiscretAffirme: number
  ambianceInfoComplementaires: string
  ambianceInspirations: { lien: string; justification: string }[]
  ambianceStylesExclus: string[]
  couleurChaudFroid: number
  couleurPastelSature: number
  couleurTerneFlashy: number
  couleurInfoComplementaires: string
  couleurCouleursEviter: string
  couleurTheme: 'sombre' | 'claire' | 'alternance' | null
  couleurThemeInfos: string
  typographieStyles: string[]
  typographieInfos: string
}

export const initialFormData: FormData = {
  logoStatus: null,
  logoFile: null,
  logoDataUrl: null,
  logoAime: '',
  logoNAimePas: '',
  logoRaison: '',
  logoAimerions: '',
  ambianceTraditionnelModerne: 50,
  ambianceMinimalisteMaximaliste: 50,
  ambianceSérieuxPlayfull: 50,
  ambianceFormelInformel: 50,
  ambianceLuxeuxAbordable: 50,
  ambianceInclusifExclusif: 50,
  ambianceDiscretAffirme: 50,
  ambianceInfoComplementaires: '',
  ambianceInspirations: [{ lien: '', justification: '' }],
  ambianceStylesExclus: [],
  couleurChaudFroid: 50,
  couleurPastelSature: 50,
  couleurTerneFlashy: 50,
  couleurInfoComplementaires: '',
  couleurCouleursEviter: '',
  couleurTheme: null,
  couleurThemeInfos: '',
  typographieStyles: [],
  typographieInfos: '',
}
