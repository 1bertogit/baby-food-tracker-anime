/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Anime Pastel Palette
        kawaii: {
          pink: '#ffd3e1',
          lavender: '#e1d7ff',
          mint: '#d3ffe4',
          peach: '#ffe4d3',
          sky: '#d3f4ff',
          cream: '#fff9d3',
        },
        // Status colors - pastel versions
        success: '#d3ffdd',
        warning: '#fff3d3',
        error: '#ffd3d3',
        info: '#d3e8ff',
        // Cel-shading colors
        'cel-shadow': 'rgba(255, 182, 193, 0.3)',
        'cel-highlight': 'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        'display': ['"Nico Moji"', 'cursive'],
        'body': ['"Nunito Sans"', 'sans-serif'],
        'sans': ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-kawaii': 'bounce-kawaii 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-kawaii': {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': { 
            transform: 'translateY(-8px) scale(1.05)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'cel': 'inset -2px -2px 4px rgba(255, 182, 193, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.8)',
        'cel-hover': 'inset -3px -3px 6px rgba(255, 182, 193, 0.4), inset 3px 3px 6px rgba(255, 255, 255, 0.9), 0 4px 12px rgba(255, 182, 193, 0.2)',
        'kawaii': '0 8px 32px rgba(255, 182, 193, 0.25)',
        'speech-bubble': '0 4px 16px rgba(255, 182, 193, 0.3)',
      },
      backgroundImage: {
        'anime-gradient': 'linear-gradient(135deg, #ffd3e1 0%, #e1d7ff 100%)',
        'kawaii-gradient': 'linear-gradient(45deg, #ffd3e1, #e1d7ff, #d3ffe4, #ffe4d3)',
      },
    },
  },
  plugins: [],
}
