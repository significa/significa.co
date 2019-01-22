import { IFullTheme, IColorsTheme } from '@theme'

interface IgetAnyColor {
  color?: string
  theme: IFullTheme
}

export const getAnyColor = ({
  color,
  theme: { colors },
}: IgetAnyColor): string => {
  if (!color) {
    return colors.foreground
  }

  if (color in colors) {
    return colors[color as keyof IColorsTheme] as string
  }

  return color
}
