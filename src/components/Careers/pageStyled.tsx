import styled from '@theme'

import Container from '../UI/Layout/Container'
import {
  Big as OriginalBig,
  displayStyle,
  bigStyle,
  textStyle,
} from '../UI/Typography'

export const Wrapper = styled(Container)`
  margin-top: 5rem;
  margin-bottom: 10rem;
  max-width: 38em;
`

export const Big = styled(OriginalBig)`
  margin-top: 5rem;
  margin-bottom: 10rem;

  img {
    margin-left: 0.7em;
    position: relative;
    top: 2px;
  }
`

export const Content = styled.div`
  h1 {
    ${displayStyle}
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    ${bigStyle}
    margin-top: 10rem;
    margin-bottom: 0.75rem;
  }

  p {
    ${textStyle}
  }

  ul {
    padding-left: 1em;
  }

  li {
    ${textStyle}
    list-style: disc;
  }
`
