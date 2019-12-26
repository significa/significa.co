import styled from 'styled-components'

import { Small } from '../../Typography'

export const Error = styled(Small).attrs({ as: 'span' })`
  color: ${({ theme }) => theme.colors.error};

  /* 
  This is meant to be used only within these Form elements.
  It's ok to add margin here to keep consistent.
   */
  margin-top: 0.25rem;
  display: block;
`
