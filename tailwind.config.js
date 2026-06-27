/** @type {import('tailwindcss').Config} */
module.exports = {
  // Only the live graph has utility classes worth scanning.
  content: ['./pages/**/*.{ts,tsx}', './src/redesign/**/*.{ts,tsx}'],
  // Preflight (Tailwind's reset) is OFF during the incremental migration so it
  // can't fight the existing site.css reset / .rz-* styles. Re-evaluate once
  // site.css is gone.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      // Mirror of the .rz-site design tokens (src/redesign/site.css).
      colors: {
        bg: '#FAFAF7',
        paper: '#FFFFFF',
        ink: { DEFAULT: '#0B0E12', 2: '#3A4150' },
        muted: '#6B7280',
        rule: { DEFAULT: '#E7E5E0', soft: '#EFEDE8' },
        blue: { DEFAULT: '#0D5992', deep: '#083E69', soft: '#DCEAF5' },
        coral: { DEFAULT: '#FF774C', soft: '#FFDFD0' },
        warn: '#F2B544',
        ok: '#1F8A5B',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Geist',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Geist Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
        serif: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
