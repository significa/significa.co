import styled from '@theme'

import { Huge as BaseHuge, Big as BaseBig } from '../../UI'

export const LabsTopWrapper = styled.section`
  padding: 10rem 2rem;

  text-align: center;

  @media (max-width: 48em) {
    padding: 8rem 2rem;
  }

  @media (max-width: 32em) {
    padding: 6rem 1rem;
  }
`

export const Huge = styled(BaseHuge)`
  margin-bottom: 0.5rem;

  /* @media (max-width: 32em) {
    font-size: 2em;
    line-height: 1.25;
    letter-spacing: 0;
  } */
`

export const Big = styled(BaseBig)``
