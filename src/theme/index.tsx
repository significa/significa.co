import React from 'react'
import styled, {
  css,
  createGlobalStyle,
  keyframes,
  StyledThemeProvider,
} from './styled'

import reset from './reset'
import style from './style'
import theme from './theme'

import { ITheme } from './types'

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
