export type colorArgumentType = 'light' | 'dark' | IColorsTheme

export interface IColors {
  significa: string
  black: string
  lightBlack: string
  grey: string
  darkGrey: string
  lightGrey: string
  white: string
  red: string
  alphaWhite: { [key: number]: string }
  alphaBlack: { [key: number]: string }
}

export interface IColorsTheme {
  brand: string
  highlight: string
  background: string
  foreground: string
  secondary: string
  medium: string
  subtle: string
  error: string
}

export interface IFullTheme {
  colors: IColorsTheme
  space: number[]
  fonts: {
    sans: string
  }
  maxWidth: string
  transitions: {
    ease: (time?: string) => string
    cubic: (time?: string) => string
  }
}
