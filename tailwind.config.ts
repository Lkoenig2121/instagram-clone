import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ig-primary': '#0095f6',
        'ig-secondary': '#262626',
        'ig-border': '#dbdbdb',
        'ig-gray': '#8e8e8e',
      },
    },
  },
  plugins: [],
}
export default config

