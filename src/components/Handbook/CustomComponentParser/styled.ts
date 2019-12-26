import styled from 'styled-components'
import { media } from '@theme'
import { Link as GatsbyLink } from 'gatsby'
import { labelStyle, Text as BaseText } from '../../UI'
import ArrowIcon from '../common/Arrow'

export const Title = styled.span`
  ${labelStyle}
  display: block;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`

export const SmallText = styled.span`
  ${labelStyle}
  color: inherit;
  line-height: 1.5;
`

export const Text = styled(BaseText)`
  margin-bottom: 0 !important;
`

export const RightArrow = styled(ArrowIcon)`
  margin-left: 0.5rem;
  transform: scale(0.8);
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const ExternalLink = styled.a`
  display: flex;
  align-items: center;

  opacity: 1 !important;

  color: ${({ theme }) => theme.colors.highlight};

  ${media.hover} {
    &:hover {
      ${RightArrow} {
        transform: scale(0.8) translateX(0.5rem);
      }
    }
  }
`

export const Link = styled(GatsbyLink)`
  display: flex;
  align-items: center;

  opacity: 1 !important;

  color: ${({ theme }) => theme.colors.highlight};

  ${media.hover} {
    &:hover {
      ${RightArrow} {
        transform: scale(0.8) translateX(0.5rem);
      }
    }
  }
`

/* Sidenote */
export const SidenoteWrapper = styled.aside`
  position: absolute;
  right: 0;

  width: 16rem;
  padding: 1rem 1.125rem;

  background: #fdf8ed;
  color: ${({ theme }) => theme.colors.foreground};
  border-left: 2px solid #fbeed2;

  ${media.large} {
    box-sizing: border-box;
    width: 16rem;
  }

  ${media.medium} {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin-bottom: 1.5rem;
  }
`

/* Box */
export const Box = styled.div`
  box-sizing: border-box;
  padding: 1rem 1.125rem;

  background-color: #f8f2f0;
  border-left: 1px solid #e8d5cd;

  margin-bottom: 2rem;

  & + h2 {
    margin-top: -2rem;
  }
`

/* Highlight */
export const Highlight = styled(Box)`
  background-color: #f5f8ff;
  border-left: 1px solid #0154ff;
`

/* Link */
export const LinkBox = styled(Box)`
  background-color: #f6f7f7;
  border-left: 1px solid #dfe0e0;
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
