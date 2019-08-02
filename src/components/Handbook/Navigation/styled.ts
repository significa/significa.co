import styled, { css } from '@theme'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

export const linkStyle = css`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1;
`

export const MainLink = styled(Link)`
  ${linkStyle}

  display: flex;
  align-items: center;

  padding: 0.75rem 0;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
`

export const AnimatedArrowHolder = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 0.5rem;
  width: 0.5rem;

  margin-right: 0.5rem;
`
