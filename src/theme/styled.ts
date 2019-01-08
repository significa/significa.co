import * as sc from 'styled-components'
import { ITheme } from './types'

/** Custom Styled components with theme interface (to export) */
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider: StyledThemeProvider,
} = sc as sc.ThemedStyledComponentsModule<ITheme>

export { css, createGlobalStyle, keyframes, StyledThemeProvider }

export default styled
