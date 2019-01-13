import styled, { css, createGlobalStyle, keyframes } from './styled'
import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'
import { ThemeContextConsumer } from './context'
import Provider from './components/Provider'
import Theme from './components/Theme'

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
}

/** Default export is our version of styled from styled-components */
export default styled
