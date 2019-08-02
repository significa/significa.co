import React from 'react'

import { Chapter } from '../../../templates/handbook'

import * as S from './styled'

const Cover: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <S.Wrapper>
      <S.Holder>
        <S.PreTitle>Handbook</S.PreTitle>
        <S.Title>{chapter.title}</S.Title>
        <S.Description>{chapter.description}</S.Description>
        <S.Mouse />
      </S.Holder>
      <S.Image
        fluid={chapter.imageSharp.childImageSharp.fluid}
        alt={chapter.image.alt}
      />
    </S.Wrapper>
  )
}

export default Cover
