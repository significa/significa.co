import styled, { css } from 'styled-components'
import { media } from '@theme'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  display: flex;
  align-items: flex-start;
`

export const NavHolder = styled.aside<{ isOpen: boolean }>`
  top: 0;
  padding: 5rem 0;
  padding-right: 3rem;
  position: sticky;
  box-sizing: border-box;

  width: 18rem;
  flex-shrink: 0;
  height: 100vh;

  overflow-y: auto;

  ${media.large} {
    position: fixed;
    z-index: 1000;

    left: 0;

    background-color: ${({ theme }) => theme.colors.background};
    overflow: auto;

    height: 100vh;
    width: 22em;
    padding: 3em 3rem 3rem 4em;
    margin-right: 0;
    transform: translatex(-100%);
    transition: transform ${({ theme }) => theme.transitions.cubic()};

    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: translatex(0);
      `}
  }
`

export const NavOverlay = styled.div<{ isOpen: boolean }>`
  display: none;

  ${media.large} {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;

    z-index: 999;
    cursor: zoom-out;
    pointer-events: none;

    transition: opacity 0.3s ease-in;

    ${({ isOpen }) =>
      isOpen &&
      css`
        pointer-events: auto;
        opacity: 1;
      `}
  }
`

export const ButtonLine = styled.span`
  position: absolute;
  left: 0.5rem;

  height: 1px;

  background-color: black;

  transform: rotate(0deg);
  transition: width ${({ theme }) => theme.transitions.cubic()},
    opacity ${({ theme }) => theme.transitions.ease()},
    transform ${({ theme }) => theme.transitions.cubic()};

  &:nth-child(1) {
    width: 0.85rem;
    top: 0.75rem;
  }

  &:nth-child(2) {
    width: 1rem;
    top: 1rem;
  }

  &:nth-child(3) {
    width: 0.8rem;
    top: 1.25rem;
  }
`

export const Hamburger = styled.button<{ isOpen: boolean }>`
  display: none;

  ${media.large} {
    display: block;
    position: fixed;
    left: 1rem;
    bottom: 1rem;

    z-index: 1001;

    box-sizing: border-box;

    width: 2rem;
    height: 2rem;

    border-radius: 0.25rem;
    cursor: pointer;

    border: none;
    outline: none;
    box-shadow: none;
    appearance: none;

    background-color: white;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    transition: box-shadow 500ms cubic-bezier(0.2, 1, 0.2, 1) 0s;

    &:hover {
      ${ButtonLine} {
        width: 1rem;
      }
    }

    ${({ isOpen }) =>
      isOpen &&
      css`
        box-shadow: rgba(0, 0, 0, 0) 0px 1px 2px, rgba(0, 0, 0, 0) 0px 2px 4px;

        ${ButtonLine} {
          &:nth-child(1) {
            width: 1rem;
            transform: rotate(45deg);
            top: 1rem;
          }

          &:nth-child(2) {
            width: 1rem;
            transform: rotate(135deg);
            opacity: 0;
          }

          &:nth-child(3) {
            width: 1rem;
            transform: rotate(135deg);
            top: 1rem;
          }
        }
      `}
  }
`

export const Main = styled.main`
  width: 100%;
  margin-top: 5rem;
  padding-left: 3rem;

  ${media.large} {
    padding-left: 0;
  }
`
