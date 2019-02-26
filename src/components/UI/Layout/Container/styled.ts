import styled from '@theme'
import { themeGet } from '../../../../utils/themeGet'

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  max-width: ${themeGet('maxWidth', '80em')};

  padding-left: 3em;
  padding-right: 3em;

  @media (max-width: 48em) {
    padding-left: 2em;
    padding-right: 2em;
  }

  @media (max-width: 32em) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`
