import { css } from '../styled'

export default css`
  body {
    font-family: ${({ theme }) => theme.fonts.sans};

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};
  }
`
