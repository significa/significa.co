import { css, media } from '@theme'
import { themeGet } from '../../../utils/themeGet'

export const baseStyle = css`
  position: relative;

  font-size: 1.125rem;
  line-height: 1;
  color: ${themeGet('colors.foreground', 'inherit')};
  text-decoration: underline;

  transition: ${({ theme }) => `color ${theme.transitions.ease()}`};

  ${media.hover} {
    &:hover {
      color: ${themeGet('colors.highlight', 'inherit')};
    }
  }

  ${media.medium} {
    ${media.hover} {
      &:hover {
        color: inherit;
      }
    }
  }
`
