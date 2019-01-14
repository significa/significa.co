import { IFullTheme, IColorsTheme } from '@theme'

export type colorType = Exclude<keyof IColorsTheme, 'alpha'>

interface IgetColor {
  color?: colorType
  theme: IFullTheme
}

export const getColor = ({ color, theme: { colors } }: IgetColor): string => {
  // alpha is not allowed for typography
  if (!color) {
    return colors.foreground
  }

  return colors[color] || colors.foreground
}
