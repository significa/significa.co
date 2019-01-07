import React from 'react'
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components'

import { ITheme } from './types'

import reset from './reset'
import style from './style'
import theme from './theme'

/* tslint:disable:no-empty */
const {
  Provider: ThemeContextProvider,
  Consumer: ThemeConsumer,
} = React.createContext({ theme: {}, updateTheme: (_: ITheme): void => {} })
/* tslint:enable:no-empty */

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
`

interface IThemeProviderProps {
  children: React.ReactNode
}

interface IThemeProviderState {
  theme: ITheme
}

class ThemeProvider extends React.Component<
  IThemeProviderProps,
  IThemeProviderState
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

export { theme, ThemeConsumer }

export default ThemeProvider
