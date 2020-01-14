import { createGlobalStyle } from 'styled-components'

import reset from './reset'
import style from './style'
import typography from './typography'

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${typography}
  ${style}
`

export default GlobalStyle
