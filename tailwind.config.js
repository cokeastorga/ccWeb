/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // COLOR DE ACENTO: Violeta Tecnológico (Elegante sobre blanco)
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Principal
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // ESCALA NEUTRA INVERTIDA (Para Modo Claro)
        dark: {
          50: '#18181b',  // Negro (para contrastes fuertes)
          100: '#09090b', // Texto Principal (Casi Negro)
          200: '#27272a',
          300: '#52525b', // Texto Secundario (Gris Oscuro)
          400: '#71717a', // Iconos
          500: '#a1a1aa', // Bordes
          600: '#d4d4d8',
          700: '#e4e4e7',
          800: '#f4f4f5', // Fondos sutiles (Cards hover)
          900: '#ffffff', // Fondos de Tarjetas (Blanco Puro)
          950: '#fafafa', // Fondo de Página (Blanco Humo / Casi blanco)
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: []
};