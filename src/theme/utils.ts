import theme, { lightTheme, darkTheme } from './theme'

import { IFullTheme, colorArgumentType } from './types'

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
