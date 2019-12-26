import styled, { keyframes } from 'styled-components'

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
  outline: none;

  display: inline-flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.highlight};

  font-family: inherit;
  font-size: 1rem;
  line-height: 1;

  &:hover ${Arrow} {
    transform: translateX(0.25em);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  margin-left: 0.5em;

  width: 0.75rem;
  height: 0.75rem;

  animation: ${rotate} 1s cubic-bezier(0.2, 1, 0.2, 1) infinite;

  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.highlight};
  border-top: 1px solid transparent;
`
