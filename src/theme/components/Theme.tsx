/**
 * This component can be used to wrap sections with different themes.
 * Can be nested and defines the theme for all the children.
 */

import React from 'react'
import { ThemeProvider } from 'styled-components'

import { colorArgumentType } from '../types'

import { mergeThemeWithColors } from '../utils'

interface IThemeProps {
  theme: colorArgumentType
  children: React.ReactNode
}

const Theme: React.FC<IThemeProps> = ({ theme, children }) => (
  <ThemeProvider theme={mergeThemeWithColors(theme)}>
    <>{children}</>
  </ThemeProvider>
)

export default Theme
