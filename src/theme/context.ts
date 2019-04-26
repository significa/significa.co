/**
 * This Context makes it easier to change the main body theme programmatically.
 * Import the ThemeContext's Consumer and use the provided `updateTheme` function to
 * change the theme on demand. It accepts `colorArgumentType` as a single argument.
 */

import React from 'react'

import { colorArgumentType } from './types'

/* tslint:disable:no-empty */
const ThemeContext = React.createContext({
  theme: {},
  updateTheme: (_: colorArgumentType): void => {},
})
/* tslint:enable:no-empty */

export default ThemeContext
