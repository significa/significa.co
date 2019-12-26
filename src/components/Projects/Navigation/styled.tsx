import React from 'react'
import styled, { css } from 'styled-components'
import { media } from '@theme'
import { motion } from 'framer-motion'

const Z_INDEXES = {
  overlay: 999,
  drawer: 1000,
  button: 1001,
}

export const AnimatedDrawer = styled(motion.nav)`
  box-sizing: border-box;
  position: fixed;
  z-index: ${Z_INDEXES.drawer};

  overflow: auto;
  -webkit-overflow-scrolling: touch;

  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 20em;

  padding: 3em 4em;

  ${media.small} {
    padding: 3em;
  }
`

export const AnimatedOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: ${Z_INDEXES.overlay};

  background-color: rgba(0, 0, 0, 0.5);

  cursor: zoom-out;
`

export const AnimatedChapterTitle = styled(motion.h3)`
  font-size: 1.2em;
  line-height: 1.375;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  margin-bottom: 1rem;

  &:not(:first-of-type) {
    margin-top: 2.5rem;
  }
`

export const AnimatedBlockTitle = styled(motion.h4)`
  font-size: 0.75em;
  line-height: 1.428;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  margin-bottom: 0.25rem;
  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.medium};

  ${media.small} {
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    font-size: 0.875em;
  }
`

export const AnimatedSectionLink = styled(motion.a)`
  font-size: 0.875em;
  line-height: 1.428;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  display: block;
  transition: color ${({ theme }) => theme.transitions.ease()};

  padding-top: 0.125rem;
  padding-bottom: 0.125rem;

  ${media.small} {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 1em;
  }

  ${media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`

export const ButtonLine = styled.span`
  position: absolute;
  left: 0.5rem;

  height: 1px;

  /** Really black **/
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

// Had to import React, make this file .tsx and manually extract
// the `visible` prop so it doesn't get passed down to the DOM
export const AnimatedNavButton = styled(props => <motion.button {...props} />)<{
  visible: boolean
}>`
  position: fixed;
  left: 1rem;
  bottom: 1rem;

  z-index: ${Z_INDEXES.button};

  box-sizing: border-box;

  width: 2rem;
  height: 2rem;

  border-radius: 0.25rem;
  cursor: pointer;

  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;

  /** Really white **/
  background-color: white;

  ${media.medium} {
    transition: box-shadow ${({ theme }) => theme.transitions.cubic()};
    box-shadow: ${p =>
      p.visible
        ? '0px 0px 0px rgba(0, 0, 0, 0)'
        : '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)'};
  }

  ${media.small} {
    left: 0.5rem;
    bottom: 0.5rem;
  }

  ${media.hover} {
    &:hover ${ButtonLine} {
      &:nth-child(1) {
        width: 1rem;
      }

      &:nth-child(2) {
        width: 1rem;
      }

      &:nth-child(3) {
        width: 1rem;
      }
    }
  }

  ${p =>
    p.visible &&
    css`
      & ${ButtonLine} {
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
`
