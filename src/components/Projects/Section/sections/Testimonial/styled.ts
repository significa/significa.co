import styled from 'styled-components'

import PaddedWrapper from '../common/PaddedWrapper'

import Icon from './QuoteIcon'

export { PaddedWrapper as Wrapper }

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
