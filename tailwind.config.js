/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#030303',
          card: '#0a0a0c',
          cardHover: '#121217',
          nav: 'rgba(3, 3, 5, 0.7)',
        },
        primary: {
          DEFAULT: '#0066FF',
          blue: '#0066FF',
          violet: '#8B5CF6',
          cyan: '#06B6D4',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 102, 255, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'pulse-fast': 'pulseGlow 2s ease-in-out infinite',
        'stream': 'streamEffect 3s linear infinite',
        'aurora': 'auroraMove 20s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.3, filter: 'drop-shadow(0 0 15px rgba(0, 102, 255, 0.2))' },
          '50%': { opacity: 0.8, filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.4))' },
        },
        streamEffect: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        auroraMove: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.8)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
