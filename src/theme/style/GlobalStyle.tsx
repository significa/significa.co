import { createGlobalStyle } from '../styled'

import reset from './reset'
import style from './style'

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${style}
`

export default GlobalStyle
