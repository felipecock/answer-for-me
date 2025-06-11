/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        a4m: {
          bg: '#09182b',
          primary: '#975cf6',
          accent: '#3cb1c3',
          text: '#f3f4f6',
          gray: {
            dark: '#2d3748',
            DEFAULT: '#4a5568',
          },
        },
      },
      borderRadius: {
        a4m: '1.25rem',
      },
    },
  },
  plugins: [],
};
