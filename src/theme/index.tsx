import { media } from './breakpoints'
import Provider from './components/Provider'
import Theme from './components/Theme'
import ThemeContext from './context'
import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'
import { colorArgumentType, IFullTheme, IColorsTheme } from './types'

export {
  /** Theme related exports (colors, etc.) */
  theme,
  lightTheme,
  darkTheme,
  colorTheme,
  colors,
  media,
  /** Context */
  ThemeContext,
  /** Components */
  Provider,
  Theme,
  /** Types */
  colorArgumentType,
  IColorsTheme,
  IFullTheme,
}
