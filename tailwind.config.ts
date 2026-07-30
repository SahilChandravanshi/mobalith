import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        elevated: 'rgb(var(--color-elevated) / <alpha-value>)',
        inset: 'rgb(var(--color-inset) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        cyan: 'rgb(var(--color-cyan) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
      },
      boxShadow: {
        glow: '0 6px 18px rgb(var(--color-brand) / 0.16)',
        panel: '0 3px 12px rgb(0 0 0 / 0.16)',
        float: '0 12px 32px rgb(0 0 0 / 0.3)',
      },
      borderRadius: { panel: '0.5rem', control: '0.375rem', pill: '0.375rem' },
      spacing: { 18: '4.5rem', 22: '5.5rem', 30: '7.5rem' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
} satisfies Config
