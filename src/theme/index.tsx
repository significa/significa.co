import React from 'react'
import styled, {
  css,
  createGlobalStyle,
  keyframes,
  StyledThemeProvider,
} from './styled'

import reset from './reset'
import style from './style'
import theme, { lightTheme, darkTheme, colorTheme, colors } from './theme'

import { ITheme, themeArgsType } from './types'

/** Theme Context */
/* tslint:disable:no-empty */
const {
  Provider: ThemeContextProvider,
  Consumer: ThemeConsumer,
} = React.createContext({
  theme: {},
  updateTheme: (_: themeArgsType): void => {},
})
/* tslint:enable:no-empty */

/** Global styles */
const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
`

const themes = {
  light: { ...theme, colors: lightTheme },
  dark: { ...theme, colors: darkTheme },
}

/** Theme Provider */
class ThemeProvider extends React.Component<
  { children: React.ReactNode },
  { theme: ITheme }
> {
  state = { theme }

  setTheme = (t: ITheme): void => this.setState({ theme: t })

  updateTheme = (color: themeArgsType): void => {
    if (typeof color === 'string') {
      return this.setTheme(themes[color] || theme)
    }

    this.setTheme({ ...theme, colors: color })
  }

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
  lightTheme,
  darkTheme,
  colorTheme,
  colors,
  ThemeProvider,
  ThemeConsumer,
  css,
  createGlobalStyle,
  keyframes,
}

export default styled
