/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#0b0b0b',
        white: '#ffffff',
        primary: '#06b6d4', // teal
        accent: '#7c3aed', // violet
        coral: '#fb7185',
        amber: '#f59e0b',
        muted: '#f5f6f7',
        soft: '#e6e7e8',
        mid: '#9aa0a6'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out both',
        'slide-up': 'slideUp 320ms cubic-bezier(.2,.8,.2,1) both',
        'float-slow': 'float 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
