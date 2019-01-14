import styled, { css, createGlobalStyle, keyframes } from './styled'
import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'
import { ThemeContextConsumer } from './context'
import Provider from './components/Provider'
import Theme from './components/Theme'
import { colorArgumentType } from './types'

export {
  /** Theme related exports (colors, etc.) */
  theme,
  lightTheme,
  darkTheme,
  colorTheme,
  colors,
  /** Context */
  ThemeContextConsumer,
  /** Components */
  Provider,
  Theme,
  /** Styled component exports */
  css,
  createGlobalStyle,
  keyframes,
  /** Types */
  colorArgumentType,
}

/** Default export is our version of styled from styled-components */
export default styled
