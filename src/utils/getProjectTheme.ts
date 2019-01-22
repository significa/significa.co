import { IColorsTheme, lightTheme, darkTheme } from '@theme'

interface ITheme extends IColorsTheme {
  name: string
}

interface IThemesByName {
  [key: string]: IColorsTheme
}

const getProjectTheme = (
  themeName: string,
  themes: ITheme[] = []
): IColorsTheme => {
  const themesByName: IThemesByName = (themes || []).reduce(
    (acc, theme) => {
      const { name: _, ...justColors } = theme
      return {
        ...acc,
        [theme.name]: justColors,
      }
    },
    {
      light: lightTheme,
      dark: darkTheme,
    }
  )
  return themesByName[themeName] || lightTheme
}

export { getProjectTheme }
