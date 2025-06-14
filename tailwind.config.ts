import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        anthracite: '#2C2C2C',
        'barbershop-gold': '#B8860B',
        'cream-white': '#F8F8F6',
        'deep-black': '#1A1A1A',
        'warm-gray': '#6B6B6B',
        'light-gray': '#E8E8E8',
        'pure-white': '#FFFFFF',
        copper: '#CD7F32',
        'dark-gold': '#8B6914',
        'gold-dark': '#8B6914',
        'light-cream': '#FAF9F7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config 