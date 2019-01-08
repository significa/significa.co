import React from 'react'
import * as sc from 'styled-components'

import { ITheme } from './types'
import reset from './reset'
import style from './style'
import theme from './theme'

/** Custom Styled components with theme interface (to export) */
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider: StyledThemeProvider,
} = sc as sc.ThemedStyledComponentsModule<ITheme>

/** Theme Context */
/* tslint:disable:no-empty */
const {
  Provider: ThemeContextProvider,
  Consumer: ThemeConsumer,
} = React.createContext({ theme: {}, updateTheme: (_: ITheme): void => {} })
/* tslint:enable:no-empty */

/** Global styles */
const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
`

/** Theme Provider */
class ThemeProvider extends React.Component<
  { children: React.ReactNode },
  { theme: ITheme }
> {
  state = { theme }

  updateTheme = (t: ITheme): void => this.setState({ theme: t })

  render() {
    return (
      <ThemeContextProvider value={{ theme, updateTheme: this.updateTheme }}>
        <StyledThemeProvider theme={this.state.theme}>
          <>
            <GlobalStyle />
            {this.props.children}
          </>
        </StyledThemeProvider>
      </ThemeContextProvider>
    )
  }
}

export {
  theme,
  ThemeProvider,
  ThemeConsumer,
  css,
  createGlobalStyle,
  keyframes,
}

export default styled
