import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D1D1F',
        cream: '#F7F5F5',
        muted: 'rgba(67,66,66,0.35)',
        border: '#CDCDCD',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        sm: ['11px', '1.4'],
        base: ['14px', '1.4'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      letterSpacing: {
        tight: '-0.01em',
      },
    },
  },
  plugins: [],
}

export default config
