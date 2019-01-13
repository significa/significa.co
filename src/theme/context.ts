import React from 'react'
import { colorArgumentType } from './types'

/* tslint:disable:no-empty */
const {
  Provider: ThemeContextProvider,
  Consumer: ThemeContextConsumer,
} = React.createContext({
  theme: {},
  updateTheme: (_: colorArgumentType): void => {},
})
/* tslint:enable:no-empty */

export { ThemeContextProvider, ThemeContextConsumer }
