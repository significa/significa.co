import React from 'react'

import * as S from './styled'
import { Chapter } from '../../../../pages/handbook'
import linkResolver from '../../../../utils/linkResolver'

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
        {chapters.map((chapter, i) => {
          return (
            <S.BoxLink key={i} to={linkResolver(chapter.chapter._meta)}>
              <div>
                <S.BoxTitle>{chapter.chapter.title}</S.BoxTitle>
                {textByLine(chapter.chapter_link_description).map((line, j) => (
                  <S.BlockSmall key={j}>{line}</S.BlockSmall>
                ))}
              </div>
              <S.LinkHolder>
                <Small>{chapter.chapter_link_text}</Small>
                <S.RightArrow />
              </S.LinkHolder>
            </S.BoxLink>
          )
        })}
      </S.BoxesHolder>
    </S.Wrapper>
  )
}

export default Category
