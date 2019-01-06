import React from 'react'
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components'

import reset from './reset'
import style from './style'
import theme from './theme'

type ThemeType = object

/* tslint:disable:no-empty */
const {
  Provider: ThemeContextProvider,
  Consumer: ThemeConsumer,
} = React.createContext({ theme: {}, updateTheme: (_: ThemeType): void => {} })
/* tslint:enable:no-empty */

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
`

export type ThemeProviderProps = {
  children: React.ReactNode
}

export type ThemeProviderState = {
  theme: ThemeType
}

class ThemeProvider extends React.Component<
  ThemeProviderProps,
  ThemeProviderState
> {
  state = { theme }

  updateTheme = (t: ThemeType): void => this.setState({ theme: t })

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

export { theme, ThemeConsumer }

export default ThemeProvider
