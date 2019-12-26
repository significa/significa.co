import styled from 'styled-components'
import { media } from '@theme'

const PaddedWrapper = styled.div`
  padding: 5em 0;

  ${media.medium} {
    padding: 4em 0;
  }

  ${media.small} {
    padding: 3em 0;
  }
`

export default PaddedWrapper
