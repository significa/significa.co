import styled from '@theme'

export const SocialLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`
