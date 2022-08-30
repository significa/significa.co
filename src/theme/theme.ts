import { IFullTheme, IColors, IColorsTheme } from './types'

export const colors: IColors = {
  significa: '#0154FF',
  black: '#111314',
  lightBlack: '#202324',
  grey: '#C4C8CC',
  darkGrey: '#8A9399',
  lightGrey: '#EDF0F2',
  white: '#FFFFFF',
  red: '#FF5050',
  alphaWhite: {
    5: 'rgba(255, 255, 255, 0.05)',
    10: 'rgba(255, 255, 255, 0.1)',
    20: 'rgba(255, 255, 255, 0.2)',
    50: 'rgba(255, 255, 255, 0.5)',
    80: 'rgba(255, 255, 255, 0.8)',
  },
  alphaBlack: {
    5: 'rgba(17, 19, 20, 0.05)',
    10: 'rgba(17, 19, 20, 0.1)',
    20: 'rgba(17, 19, 20, 0.2)',
    50: 'rgba(17, 19, 20, 0.5)',
    80: 'rgba(17, 19, 20, 0.8)',
  },
}

export const lightTheme: IColorsTheme = {
  brand: colors.significa,
  highlight: colors.significa,
  background: colors.white,
  foreground: colors.black,
  secondary: colors.darkGrey,
  medium: colors.grey,
  subtle: colors.lightGrey,
  error: colors.red,
}

export const darkTheme: IColorsTheme = {
  brand: colors.significa,
  highlight: colors.darkGrey,
  background: colors.black,
  foreground: colors.lightGrey,
  secondary: colors.darkGrey,
  medium: colors.darkGrey,
  subtle: colors.alphaWhite[10],
  error: colors.red,
}

export const colorTheme: IColorsTheme = {
  brand: colors.significa,
  highlight: colors.white,
  background: colors.significa,
  foreground: colors.white,
  secondary: colors.alphaWhite[80],
  medium: colors.alphaWhite[50],
  subtle: colors.alphaWhite[10],
  error: colors.white,
}

const theme: IFullTheme = {
  colors: lightTheme,
  space: [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 80, 120, 160, 200],
  fonts: {
    sans:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  maxWidth: '80em',
  transitions: {
    ease: (time = '200ms') => `${time} ease-in-out`,
    cubic: (time = '500ms') => `${time} cubic-bezier(0.2, 1, 0.2, 1)`,
  },
}

export default theme
