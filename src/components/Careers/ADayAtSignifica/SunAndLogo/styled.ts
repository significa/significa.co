import styled, { css } from 'styled-components'

export const Toggle = styled.g`
  cursor: pointer;

  rect {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.ease()};
  }
`

export const Path = styled.g``

export const Sun = styled.circle``

export const Logo = styled.path``

export const LittleCircle = styled.circle`
  stroke: ${({ theme }) => theme.colors.foreground};
  fill: ${({ theme }) => theme.colors.background};
`

interface ISvgProps {
  animationEnded: boolean
}

export const Svg = styled.svg`
  transform: translate3d(0, 0, 0);
  width: 100%;
  overflow: visible;
  pointer-events: ${({ animationEnded }: ISvgProps) =>
    animationEnded ? 'default' : 'none'};

  ${({ animationEnded }) =>
    animationEnded &&
    css`
      ${Toggle} {
        rect {
          opacity: 0.1;
        }
      }

      ${Path} {
        display: none;
      }

      ${Sun} {
        transition: cx ${({ theme }) => theme.transitions.cubic()};
        transition-delay: 100ms;
      }
    `}
`
