import styled, { css } from 'styled-components'
import { media } from '@theme'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

import { Label } from '../../UI'

export const Wrapper = styled.div`
  margin-bottom: 5rem;
`

export const CategoryLabel = styled(Label)`
  display: block;
  color: ${({ theme }) => theme.colors.secondary};

  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  margin-left: 1rem;
`

export const linkStyle = css`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1;
`

export const MainLink = styled(Link)`
  ${linkStyle}

  display: flex;
  align-items: center;

  padding: 0.6rem 0;

  ${media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
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
