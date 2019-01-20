import styled from '@theme'
import { themeGet } from '../../../utils/themeGet'

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  max-width: ${themeGet('maxWidth', '80em')};

  padding: 0 3em;

  @media (max-width: 48em) {
    padding: 0 2em;
  }

  @media (max-width: 32em) {
    padding: 0 1em;
  }
`
