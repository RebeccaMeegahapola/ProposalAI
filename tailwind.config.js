/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0A0E1A',
        'surface':    '#111827',
        'primary':    '#6C63FF',
        'accent':     '#00D4FF',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-up':     'fadeUp 0.5s ease both',
        'fade-up-2':   'fadeUp 0.5s ease 0.08s both',
        'fade-up-3':   'fadeUp 0.5s ease 0.16s both',
        'orb-float-1': 'orbFloat 9s ease-in-out infinite',
        'orb-float-2': 'orbFloat 12s ease-in-out 3s infinite',
        'orb-pulse':   'orbPulse 6s ease-in-out infinite',
        'grid-scroll': 'gridScroll 28s linear infinite',
        'shimmer':     'shimmer 4s linear infinite',
        'dot-ping-1':  'dotPing 2.4s ease-in-out infinite',
        'dot-ping-2':  'dotPing 2.4s ease-in-out 0.4s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%':      { transform: 'translateY(-18px) translateX(10px)' },
          '66%':      { transform: 'translateY(10px) translateX(-8px)' },
        },
        orbPulse: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%':      { opacity: '0.25', transform: 'scale(1.08)' },
        },
        gridScroll: {
          from: { transform: 'translateY(0)' },
          to:   { transform: 'translateY(-50%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        dotPing: {
          '0%, 100%': { transform: 'scale(1)',   opacity: '1' },
          '50%':      { transform: 'scale(1.5)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}