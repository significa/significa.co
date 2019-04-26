import React from 'react'

import * as S from './styled'

interface ITop {
  title: string
  subtitle: string
}

const Top: React.FC<ITop> = ({ title, subtitle }) => {
  return (
    <S.LabsTopWrapper>
      <S.Huge>{title}</S.Huge>
      <S.Big>{subtitle}</S.Big>
    </S.LabsTopWrapper>
  )
}

export default Top
