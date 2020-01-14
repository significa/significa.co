import theme, { darkTheme, lightTheme } from './theme'
import { colorArgumentType, IFullTheme } from './types'

const themes = {
  light: { ...theme, colors: lightTheme },
  dark: { ...theme, colors: darkTheme },
}

export const mergeThemeWithColors = (c: colorArgumentType): IFullTheme => {
  if (typeof c === 'string') {
    return themes[c] || theme
  }

  return { ...theme, colors: c }
}
