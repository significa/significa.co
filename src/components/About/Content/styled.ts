import styled from '@theme'

import { Text as BaseText } from '../../UI'

export const Text = styled(BaseText)`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`
