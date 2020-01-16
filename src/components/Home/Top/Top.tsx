import { motion } from 'framer-motion'
import React from 'react'

import * as S from './Top.styled'

interface TopProps {
  top: string[]
}

const SPRING_TRANSITION = {
  type: 'spring',
  damping: 18,
  stiffness: 200,
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 60, transition: SPRING_TRANSITION },
  show: { y: 0, transition: SPRING_TRANSITION },
}

const Top: React.FC<TopProps> = ({ top }) => {
  return (
    <>
      <S.Wrapper>
        <S.Holder>
          <motion.h1 variants={container} initial="hidden" animate="show">
            {top.map((word, i) => {
              return (
                <S.WordHolder key={i}>
                  <motion.span
                    variants={item}
                    style={{ display: 'inline-block' }}
                  >
                    {word}{' '}
                  </motion.span>
                </S.WordHolder>
              )
            })}
          </motion.h1>
        </S.Holder>
      </S.Wrapper>
    </>
  )
}

export default Top
