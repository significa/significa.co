import { css } from '../styled'
import InterRegularWoff from './fonts/Inter-Regular.woff'
import InterRegularWoff2 from './fonts/Inter-Regular.woff2'
import InterLightWoff from './fonts/Inter-Light.woff'
import InterLightWoff2 from './fonts/Inter-Light.woff2'

export default css`
  @font-face {
    font-family: 'Inter';
    src: url(${InterRegularWoff2}) format('woff2'),
      url(${InterRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: auto;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterLightWoff2}) format('woff2'),
      url(${InterLightWoff}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
`
