/**
 * This is the main site Provider. It will inject global styles and create the ThemeContext Provider.
 * It's meant to be used only once at the top of the site (e.g.: Layout).
 */

import React from 'react'

import { colorArgumentType } from '../types'

import Theme from './Theme'
import GlobalStyle from '../style/GlobalStyle'
import ThemeContext from '../context'

import { mergeThemeWithColors } from '../utils'

interface IProviderProps {
  children: React.ReactNode
  theme?: colorArgumentType
}

const Provider: React.FC<IProviderProps> = ({ children, theme = 'light' }) => {
  const [colors, setTheme] = React.useState<colorArgumentType>(theme)

  const updateTheme = (c: colorArgumentType): void => setTheme(c)

  return (
    <ThemeContext.Provider
      value={{
        theme: mergeThemeWithColors(colors),
        updateTheme,
      }}
    >
      <Theme theme={colors}>
        <GlobalStyle />
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

export default Provider
