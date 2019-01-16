import styled from '@theme'
import { themeGet } from '../../../utils/themeGet'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  max-width: ${themeGet('maxWidth', '80em')};

  padding: 0 1em;
`

export default Container
