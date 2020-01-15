import { motion } from 'framer-motion'
import styled from 'styled-components'

import { media } from '@theme'
import { Container, Text as BaseText } from 'components/UI'

export const Wrapper = styled(Container)`
  display: flex;

  justify-content: space-between;

  ${media.largest} {
    flex-direction: column;
  }
`

export const TextContent = styled.div`
  flex: 1;
`

export const TextHolder = styled.div`
  position: sticky;
  top: 7rem;
  padding-bottom: 14rem;

  ${media.largest} {
    position: relative;
    top: 0;
    padding-bottom: 0;
    max-width: 27rem;
  }
`

export const Text = styled(BaseText)`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

export const Boxes = styled.div`
  display: flex;
  justify-content: flex-end;

  flex: 2;

  ${media.largest} {
    justify-content: center;

    margin-top: 7em;
  }
`

export const BoxesLeft = styled.div`
  margin-top: 10rem;
  margin-right: 2rem;

  ${media.largest} {
    margin-right: 1.5rem;
    margin-top: 0;
  }
`

export const BoxesRight = styled.div`
  margin-top: 20rem;

  ${media.largest} {
    margin-top: 0;
    display: flex;

    & > *:first-child {
      margin-right: 1.5rem;
    }
  }
`

export const AnimatedBox = styled(motion.div)`
  display: block;

  ${media.largest} {
    display: none;
  }
`

export const StaticBox = styled.div`
  display: none;

  ${media.largest} {
    display: block;
  }
`
