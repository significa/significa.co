import styled from '@theme'

import { Text as TextBase } from '../../UI'

export const Wrap = styled.div`
  display: flex;
`

export const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  margin-right: 1em;

  img {
    width: 100%;
  }
`

export const Text = styled(TextBase)`
  line-height: 1.2;
`
