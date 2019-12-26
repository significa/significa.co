// import original module declarations
import 'styled-components'
import { IFullTheme } from './src/theme/types'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends IFullTheme {}
}
