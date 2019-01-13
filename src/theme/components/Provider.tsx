/**
 * This is the main site Provider. It will inject global styles and create the ThemeContext Provider.
 * It's meant to be used only once at the top of the site (e.g.: Layout).
 */

import React from 'react'
import { colorArgumentType } from '@theme/types'

import { ThemeContextProvider } from '../context'
import Theme from './Theme'
import GlobalStyle from '../style/GlobalStyle'
import { mergeThemeWithColors } from '@theme/utils'

interface IProviderProps {
  children: React.ReactNode
  theme: colorArgumentType
}

interface IProviderState {
  colors: colorArgumentType
}

class Provider extends React.Component<IProviderProps, IProviderState> {
  static defaultProps = { theme: 'light' }

  constructor(props: IProviderProps) {
    super(props)

    this.state = { colors: props.theme }
  }

  updateTheme = (colors: colorArgumentType): void => this.setState({ colors })

  render() {
    return (
      <ThemeContextProvider
        value={{
          theme: mergeThemeWithColors(this.state.colors),
          updateTheme: this.updateTheme,
        }}
      >
        <Theme theme={this.state.colors}>
          <GlobalStyle />
          {this.props.children}
        </Theme>
      </ThemeContextProvider>
    )
  }
}

export default Provider
