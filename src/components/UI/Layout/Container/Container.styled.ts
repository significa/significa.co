import styled from 'styled-components'
import { media } from '@theme'
import { themeGet } from '../../../../utils/themeGet'

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  max-width: ${themeGet('maxWidth', '80em')};

  padding-left: 3em;
  padding-right: 3em;

  ${media.medium} {
    padding-left: 2em;
    padding-right: 2em;
  }

  ${media.small} {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`
