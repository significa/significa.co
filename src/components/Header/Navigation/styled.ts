import styled, { css } from 'styled-components'
import { media } from '@theme'

import { NavLink } from '../../UI/'

export const Wrapper = styled.div`
  ${media.medium} {
    /* Dirty hack to hide the top shadow of the mobile menu */
    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 101;
      left: 0;
      right: 0;
      bottom: 0;
      height: 10px;
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`

interface IHambuguer {
  show: boolean
}

export const Hamburguer = styled.button`
  display: none;
  position: relative;

  width: 2.5em;
  height: 2.5em;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;

    &:before,
    &:after {
      opacity: 0.8;
    }
  }

  &:before,
  &:after {
    content: '';
    background-color: ${({ theme }) => theme.colors.foreground};
    height: 2px;
    width: 100%;
    left: 0;
    position: absolute;
  }

  &:before {
    top: 0.75em;
    transition: transform ${({ theme }) => theme.transitions.cubic()},
      top ${({ theme }) => theme.transitions.cubic()};
  }

  &:after {
    bottom: 0.75em;
    transition: transform ${({ theme }) => theme.transitions.cubic()},
      bottom ${({ theme }) => theme.transitions.cubic()};
  }

  ${(p: IHambuguer) =>
    p.show &&
    css`
      &:before {
        top: 1.15em;
        transform: rotate(45deg);
      }

      &:after {
        bottom: 1.15em;
        transform: rotate(135deg);
      }
    `}

  ${media.medium} {
    display: block;
  }
`

interface INavWrapper {
  show: boolean
  itemsHeight: number
}

export const NavWrapper = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2em;

  ${media.medium} {
    position: absolute;
    z-index: 100;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.background};

    top: ${(p: INavWrapper) => (p.show ? 'calc(100%)' : '100%')};
    max-height: ${(p: INavWrapper) =>
      p.show ? `${p.itemsHeight / 16}em` : '0em'};
    right: 0;
    left: 0;

    padding: 0 1.9em;

    display: block;
    text-align: right;

    transition: top ${({ theme }) => theme.transitions.cubic()},
      max-height ${({ theme }) => theme.transitions.cubic()},
      box-shadow ${({ theme }) => theme.transitions.cubic()};

    box-shadow: ${(p: INavWrapper) =>
      p.show
        ? '0 1px 2px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.05)'
        : '0 0 rgba(0,0,0,0)'};

    ${NavLink} {
      display: block;
      font-size: 1.25em;
      line-height: 1;
      color: ${({ theme }) => theme.colors.foreground};

      &:last-child {
        padding-bottom: 3rem;
      }
    }
  }
`
