import styled from '@theme'

import { baseInputStyle } from '../common'

export const Textarea = styled.textarea.attrs({ rows: 1 })`
  ${baseInputStyle};
  resize: none;
`
