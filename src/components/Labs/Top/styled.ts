import styled, { media } from '@theme'

import { Huge as BaseHuge, Big as BaseBig } from '../../UI'

export const LabsTopWrapper = styled.section`
  padding: 10rem 2rem;

  text-align: center;

  ${media.medium} {
    padding: 8rem 2rem;
  }

  ${media.small} {
    padding: 6rem 1rem;
  }
`

export const Huge = styled(BaseHuge)`
  margin-bottom: 0.5rem;
`

export const Big = styled(BaseBig)``
