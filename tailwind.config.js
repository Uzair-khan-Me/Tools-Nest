/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#101828', 800: '#1d2939', 600: '#475467' },
        brand: { 50: '#eff8ff', 100: '#d1e9ff', 500: '#1570ef', 600: '#175cd3', 700: '#1849a9' },
        mint: { 50: '#ecfdf3', 500: '#12b76a', 600: '#039855' },
      },
      boxShadow: { soft: '0 1px 2px rgba(16,24,40,.04), 0 4px 18px rgba(16,24,40,.06)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'] },
    },
  },
  plugins: [],
}
