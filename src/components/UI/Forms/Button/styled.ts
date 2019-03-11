import styled from '@theme'

import ArrowIcon from './Arrow'

export const Arrow = styled(ArrowIcon)`
  margin-left: 0.5em;

  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Button = styled.button`
  background: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.highlight};

  font-family: inherit;
  font-size: 1rem;
  line-height: 1;

  &:hover ${Arrow} {
    transform: translateX(0.25em);
  }
`
