import { IFullTheme, IColors, IColorsTheme } from './types'

export const colors: IColors = {
  significa: '#0154FF',
  black: '#111314',
  lightBlack: '#202324',
  grey: '#C4C8CC',
  darkGrey: '#8A9399',
  lightGrey: '#F5F6F7',
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
  highlight: colors.significa,
  background: colors.white,
  foreground: colors.black,
  secondary: colors.lightBlack,
  medium: colors.grey,
  subtle: colors.lightGrey,
  error: colors.red,
  alpha: {
    background: colors.alphaWhite,
    foreground: colors.alphaBlack,
  },
}

export const darkTheme: IColorsTheme = {
  highlight: colors.white,
  background: colors.black,
  foreground: colors.white,
  secondary: colors.lightGrey,
  medium: colors.darkGrey,
  subtle: colors.lightBlack,
  error: colors.red,
  alpha: {
    background: colors.alphaBlack,
    foreground: colors.alphaWhite,
  },
}

export const colorTheme: IColorsTheme = {
  highlight: colors.white,
  background: colors.significa,
  foreground: colors.white,
  secondary: colors.alphaWhite[80],
  medium: colors.alphaWhite[50],
  subtle: colors.alphaWhite[10],
  error: colors.white,
  alpha: {
    background: colors.alphaBlack,
    foreground: colors.alphaWhite,
  },
}

const theme: IFullTheme = {
  colors: lightTheme,
  space: [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 80, 120, 160, 200],
  fonts: {
    serif: "'Acta', 'Times New Roman', Times, serif",
    sans:
      "'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  maxWidth: '80em',
  transitions: {
    ease: (time: string = '200ms') => `${time} ease-in-out`,
    cubic: (time: string = '600ms') => `${time} cubic-bezier(0.19, 1, 0.22, 1)`,
  },
}

export default theme
