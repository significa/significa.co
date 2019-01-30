import styled from '@theme'

import Icon from './QuoteIcon'

export const Wrapper = styled.div`
  padding: 5em 0;
`

export const Quote = styled(Icon)`
  margin-bottom: 3em;
`

export const Meta = styled.div`
  margin-top: 3em;
  padding-top: 2em;

  border-top: 1px solid ${({ theme }) => theme.colors.subtle};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
