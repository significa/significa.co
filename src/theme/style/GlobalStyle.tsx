import { createGlobalStyle } from 'styled-components'

import reset from './reset'
import typography from './typography'
import style from './style'

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${typography}
  ${style}
`

export default GlobalStyle
