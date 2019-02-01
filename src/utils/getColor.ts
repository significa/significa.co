import { IFullTheme, IColorsTheme } from '@theme'

export type colorType = keyof IColorsTheme

interface IgetColor {
  color?: colorType
  theme: IFullTheme
}

export const getColor = ({ color, theme: { colors } }: IgetColor): string => {
  if (!color) {
    return colors.foreground
  }

  return colors[color] || colors.foreground
}
