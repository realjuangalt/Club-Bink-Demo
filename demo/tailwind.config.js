module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFE4B5',
          200: '#FFD700',
          300: '#FFA500',
          400: '#FF8C00',
          500: '#8B4513',
        },
        secondary: {
          100: '#98FB98',
          200: '#90EE90',
          300: '#32CD32',
          400: '#228B22',
          500: '#006400',
        },
        neutral: {
          100: '#FFFFFF',
          200: '#E8E8E8',
          300: '#A9A9A9',
          400: '#808080',
          500: '#696969',
          600: '#4D4D4D',
          700: '#363636',
          800: '#242424',
          900: '#1A1A1A',
          1000: '#000000',
        },
        error: {
          100: '#FF4D4D',
          200: '#FF0000',
        },
        warning: {
          100: '#FFD700',
          200: '#FFB700',
        },
        success: {
          100: '#98FB98',
          200: '#00FF00',
        },
      },
    },
  },
}

