import { IFullTheme, IColorsTheme } from '@theme'

export type colorType = keyof IColorsTheme

interface IGetColor {
  color?: colorType
  theme: IFullTheme
}

export const getColor = ({ color, theme: { colors } }: IGetColor): string => {
  if (!color) {
    return colors.foreground
  }

  return colors[color] || colors.foreground
}
