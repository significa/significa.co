import React from 'react'

import { Big } from '../../UI/'

import * as S from './styled'

interface INext {
  title: string
  tagline: string
  link: string
}

const Next: React.FC<INext> = ({ title, tagline, link }) => {
  return (
    <S.Section>
      <S.Container>
        <S.Display>{title}</S.Display>
        <Big>{tagline}</Big>
        <S.ArrowLink to={link}>View project</S.ArrowLink>
      </S.Container>
    </S.Section>
  )
}

export default Next
