import { css } from './styled'

export default css`
  body {
    font-family: sans-serif;

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};
  }
`
