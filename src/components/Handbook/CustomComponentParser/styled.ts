import styled, { media } from '@theme'
import { labelStyle } from '../../UI'

export const Title = styled.span`
  ${labelStyle}
  display: block;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`

export const Text = styled.span`
  ${labelStyle}
  line-height: 1.5;
`

/* Sidenote */
export const SidenoteWrapper = styled.aside`
  position: absolute;
  right: 0;

  padding: 1rem 1.125rem;
  width: 16rem;

  background: #fdf8ed;
  color: ${({ theme }) => theme.colors.foreground};
  border-left: 2px solid #fbeed2;
`

/* Box */
export const Box = styled.div`
  padding: 1rem 1.125rem;

  background-color: #f8f2f0;
  border-left: 1px solid #e8d5cd;
`

/* Tooltip */
export const Tooltip = styled.span`
  ${labelStyle};
  pointer-events: none;

  opacity: 0;

  white-space: normal;
  line-height: 1.5;

  position: absolute;
  z-index: 99;
  left: 50%;
  transform: translateY(1rem) translateX(-50%);
  top: 100%;
  margin-top: 0.5rem;

  width: 12rem;

  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.background};

  padding: 1rem;
  border-radius: 2px;

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.25);

  transition: opacity ${({ theme }) => theme.transitions.ease()},
    transform ${({ theme }) => theme.transitions.cubic()};
`

export const Abbr = styled.abbr`
  white-space: nowrap;
  text-decoration: none;

  cursor: help;

  position: relative;

  background-color: #fdf5e4;
  border-bottom: 1px dashed #f9db99;

  ${media.hover} {
    &:hover ${Tooltip} {
      pointer-events: auto;
      opacity: 1;

      transform: translateY(0rem) translateX(-50%);
    }
  }
`
