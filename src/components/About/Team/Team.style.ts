import styled from 'styled-components'

import { Text, TitleAndText } from 'components/UI'

export const TitleHolder = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`

export const TeamHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

  grid-gap: 3rem;
`

export const Name = styled(Text)`
  margin-top: 1rem;
`

export const IconHolder = styled.div`
  position: absolute;
  z-index: 1;

  top: 0.75rem;
  right: 1.25rem;

  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  img {
    width: auto;
    height: 100%;
  }
`

export const ImageHolder = styled.div`
  position: relative;

  &:hover ${IconHolder} {
    opacity: 1;
  }
`

export const SubText = styled(TitleAndText)`
  margin: 0 auto;
  margin-top: 5rem;
`
