/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray-bg': '#EDEDED',
      },
      width: {
        'contact-list': '558px',
        'contact-form': '280px',
        'contact': "431px"
      }
    },
  },
  plugins: [],
}

