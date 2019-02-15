import styled, { css } from '@theme'
import { animated } from 'react-spring'

export const ProjectNavigation = styled.nav`
  box-sizing: border-box;
  position: fixed;
  z-index: -1;

  overflow: auto;

  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 18em;

  padding: 4em;
`

export const ChapterTitle = styled(animated.h3)`
  font-size: 1em;
  line-height: 1.375;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};

  &:not(:first-of-type) {
    margin-top: 1.5rem;
  }
`

export const BlockTitle = styled(animated.h4)`
  font-size: 0.75em;
  line-height: 1.428;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  margin-bottom: 0.25rem;
  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.medium};
`

export const SectionLink = styled(animated.a)`
  font-size: 0.875em;
  line-height: 1.428;
  letter-spacing: 0;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.foreground};

  display: block;
  transition: color ${({ theme }) => theme.transitions.ease()};

  &:not(:first-of-type) {
    padding-top: 0.125rem;
  }

  &:not(:last-of-type) {
    padding-bottom: 0.125rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
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

export const NavigationButton = styled.button<{ visible: boolean }>`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;

  box-sizing: border-box;

  width: 2rem;
  height: 2rem;

  border-radius: 1rem;
  cursor: pointer;

  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;

  /** Really white **/
  background-color: white;

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
