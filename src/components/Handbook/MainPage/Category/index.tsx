import React from 'react'

import * as S from './styled'
import { Chapter } from '../../../../pages/handbook'

import { Text, Small } from '../../../UI'
import { textByLine } from '../../../../utils/textByLine'

interface CategoryProps {
  title: string
  description: string
  chapters: Chapter[]
}

const Category = ({ title, description, chapters }: CategoryProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <div>
          <S.Title>{title}</S.Title>
          <Text>{description}</Text>
        </div>
      </S.Header>
      <S.BoxesHolder>
        {chapters.map(
          ({ chapter, chapter_link_description, chapter_link_text }, i) => {
            return (
              <S.BoxLink key={i} to={chapter.url}>
                <div>
                  <S.BoxTitle>{chapter.document.data.title}</S.BoxTitle>
                  {textByLine(chapter_link_description).map((line, j) => (
                    <S.BlockSmall key={j}>{line}</S.BlockSmall>
                  ))}
                </div>
                <S.LinkHolder>
                  <Small>{chapter_link_text}</Small>
                  <S.RightArrow />
                </S.LinkHolder>
              </S.BoxLink>
            )
          }
        )}
      </S.BoxesHolder>
    </S.Wrapper>
  )
}

export default Category
