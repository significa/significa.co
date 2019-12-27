import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'
import ThemeContext from './context'
import Provider from './components/Provider'
import Theme from './components/Theme'
import { colorArgumentType, IFullTheme, IColorsTheme } from './types'
import { media } from './breakpoints'

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
