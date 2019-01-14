import { css } from '../styled'
import GraphikWoff from './fonts/Graphik-Regular.woff'
import GraphikWoff2 from './fonts/Graphik-Regular.woff2'
import ActaDeckWoff from './fonts/ActaDeck-Book.woff'
import ActaDeckWoff2 from './fonts/ActaDeck-Book.woff2'

export default css`
  @font-face {
    font-family: 'Graphik';
    src: url(${GraphikWoff2}) format('woff2'),
      url(${GraphikWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Acta';
    src: url(${ActaDeckWoff2}) format('woff2'),
      url(${ActaDeckWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`
