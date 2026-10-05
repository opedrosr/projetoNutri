/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:       '#102110',
        'forest-mid': '#1c3a1c',
        'forest-rim': '#274827',
        leaf:         '#3a6b2a',
        lime:         '#5a9e3a',
        'lime-light': '#7dc458',
        sage:         '#a8bf8a',
        'sage-pale':  '#d4e4c0',
        cream:        '#f4f0e6',
        'warm-white': '#faf8f3',
        ink:          '#111811',
        'ink-mid':    '#243524',
        muted:        '#6b7f5c',
        gold:         '#c8965a',
        'gold-light': '#e8b87a',
        border:       '#e2ddd0',
        'border-dark':'#2c4a2c',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 10vw, 9rem)',   { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'body-lg':    ['1.0625rem', { lineHeight: '1.7' }],
        'body-md':    ['0.9375rem', { lineHeight: '1.7' }],
        'body-sm':    ['0.875rem',  { lineHeight: '1.65' }],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
