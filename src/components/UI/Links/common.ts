import { css } from '@theme'
import { themeGet } from '../../../utils/themeGet'

export const baseStyle = css`
  position: relative;

  font-size: 1em;
  line-height: 1;
  color: ${themeGet('colors.foreground', 'inherit')};
  text-decoration: underline;

  transition: ${({ theme }) => `color ${theme.transitions.ease()}`};

  @media (hover: hover) {
    &:hover {
      color: ${themeGet('colors.highlight', 'inherit')};
    }
  }

  @media (max-width: 48em) {
    &:hover {
      color: inherit;
    }
  }
`