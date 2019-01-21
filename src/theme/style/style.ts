import { css } from '../styled'

export default css`
  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`
