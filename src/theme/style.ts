import { css } from './'

const TRANSITION_TIME = '0.2s'

export default css`
  body {
    font-family: sans-serif;

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};

    transition: background-color ${TRANSITION_TIME} ease,
      color ${TRANSITION_TIME} ease;
  }
`
