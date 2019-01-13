/**
 * This component can be used to wrap sections with different themes.
 * Can be nested and defines the theme for all the children.
 */

import React from 'react'

import { StyledThemeProvider } from '../styled'

import { colorArgumentType } from '../types'
import { mergeThemeWithColors } from '@theme/utils'

interface IThemeProps {
  theme: colorArgumentType
  children: React.ReactNode
}

const Theme = ({ theme, children }: IThemeProps) => (
  <StyledThemeProvider theme={mergeThemeWithColors(theme)}>
    <>{children}</>
  </StyledThemeProvider>
)

export default Theme
