import React from 'react'
import { motion } from 'framer-motion'

import RecentProjects from './RecentProjects'

import * as S from './styled'

interface ITop {
  headline: string
  tagline: string
}

const SPRING_TRANSITION = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
}

const Top: React.FC<ITop> = ({ headline, tagline }) => (
  <>
    <S.Wrapper>
      <S.Info>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 30, opacity: 0 }}
          transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
        >
          <S.Huge>{headline}</S.Huge>
        </motion.div>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 30, opacity: 0 }}
          transition={{ ...SPRING_TRANSITION, delay: 0.2 }}
        >
          <S.SmallTitle>{tagline}</S.SmallTitle>
        </motion.div>
      </S.Info>
    </S.Wrapper>

    <RecentProjects />
  </>
)

export default Top
