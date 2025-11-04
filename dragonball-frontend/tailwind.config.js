/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dragon-orange': '#FF6B35',
        'dragon-blue': '#004E89',
        'dragon-gold': '#FFD23F',
        'saiyan-blue': '#1E40AF',
      },
      fontFamily: {
        'dragon': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}