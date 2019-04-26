import styled, { css, createGlobalStyle, keyframes } from './styled'
import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'
import ThemeContext from './context'
import Provider from './components/Provider'
import Theme from './components/Theme'
import { colorArgumentType, IFullTheme, IColorsTheme } from './types'

export {
  /** Theme related exports (colors, etc.) */
  theme,
  lightTheme,
  darkTheme,
  colorTheme,
  colors,
  /** Context */
  ThemeContext,
  /** Components */
  Provider,
  Theme,
  /** Styled component exports */
  css,
  createGlobalStyle,
  keyframes,
  /** Types */
  colorArgumentType,
  IColorsTheme,
  IFullTheme,
}

/** Default export is our version of styled from styled-components */
export default styled
