import { IFullTheme, IColorsTheme } from '@theme'

interface IgetAnyColor {
  color?: string
  theme: IFullTheme
}

export const getAnyColor = ({
  color,
  theme: { colors },
}: IgetAnyColor): string => {
  // alpha is an object and may cause some problems
  if (!color || color === 'alpha') {
    return colors.foreground
  }

  if (color in colors) {
    return colors[color as keyof IColorsTheme] as string
  }

  return color
}
