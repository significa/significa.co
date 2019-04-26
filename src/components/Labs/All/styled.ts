import Image from 'gatsby-image'
import styled from '@theme'
import {
  Container as BaseContainer,
  Big as BaseBig,
  Text,
  LabsIcon as Icon,
} from '../../UI/'

export const Wrapper = styled(BaseContainer)`
  max-width: 70em;
  margin: 10em auto;

  display: flex;

  @media (max-width: 32em) {
    margin-top: 0;
    margin-bottom: 5em;
  }
`

/** Sidebar */
export const Sidebar = styled.nav`
  max-width: 16em;
  width: 100%;
  padding-right: 3em;

  display: flex;
  flex-direction: column;

  @media (max-width: 64em) {
    max-width: 12em;
  }

  @media (max-width: 48em) {
    display: none;
  }
`

export const Filter = styled(BaseBig).attrs({ as: 'a', role: 'button' })<{
  active: boolean
}>`
  display: inline-block;
  padding: 0.125rem 0;

  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  color: ${({ theme, active }) =>
    active ? theme.colors.foreground : theme.colors.medium};
  transition: color ${({ theme }) => theme.transitions.ease()};

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.foreground};
    }
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

/** Items */
export const ItemLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: flex;
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }

  &:not(:last-child) {
    margin-bottom: 2em;
  }

  @media (max-width: 32em) {
    flex-direction: column;
  }
`

export const ImgHolder = styled.div`
  position: relative;
`

export const LabsIcon = styled(Icon)`
  display: none;

  position: absolute;
  top: 0.75rem;
  left: 0.75rem;

  z-index: 10;

  @media (max-width: 32em) {
    display: block;
  }
`

export const Img = styled(Image)`
  margin-right: 2em;
  margin-bottom: 2em;

  min-width: 10em;
  height: 5.5em;

  border-radius: 2px;

  @media (max-width: 64em) {
    min-width: 8em;
  }

  @media (max-width: 32em) {
    width: 100%;
    height: auto;
  }
`

export const ContentHolder = styled.div`
  padding-bottom: 2em;

  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};
`

export const More = styled(Text)`
  margin-top: 0.5em;
`
