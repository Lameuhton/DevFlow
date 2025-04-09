/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          100: '#1E293B',
          200: '#172033',
          300: '#0F172A',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [
    // Plugin pour améliorer l'accessibilité
    function({ addBase, theme }) {
      addBase({
        // Amélioration du focus outline pour une meilleure accessibilité
        '*:focus-visible': {
          outline: `2px solid ${theme('colors.primary.500')}`,
          outlineOffset: '2px',
        },
        // Amélioration du contraste en mode sombre
        '.dark': {
          '--tw-text-opacity': '1',
          '--tw-bg-opacity': '1',
        },
      });
    },
  ],
};