/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import { PICK_THEME } from './src/utils/constant';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [PICK_THEME.LIGHT, PICK_THEME.DARK],
  },
}