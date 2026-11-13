/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#253B32',
          50: '#F2F6F4',
          100: '#E1EBE6',
          200: '#C2D7CD',
          700: '#1C2C25',
          800: '#253B32',
          900: '#15211C',
        },
        leather: {
          DEFAULT: '#A66D43',
          light: '#BE875D',
          dark: '#87532F',
        },
        warmbeige: {
          DEFAULT: '#D6B889',
          light: '#EAD7BA',
          dark: '#BFA06F',
        },
        cream: {
          DEFAULT: '#F5F0E7',
          light: '#FAF7F2',
          dark: '#ECE3D4',
        },
        charcoal: {
          DEFAULT: '#292B29',
          light: '#3C403C',
          dark: '#1C1D1C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
