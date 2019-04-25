import { css } from '../styled'

export default css`
  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};

    font-feature-settings: 'liga', 'kern';
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* to propagate the current theme */
  #___gatsby,
  #___gatsby > div {
    background: inherit;
  }
`
