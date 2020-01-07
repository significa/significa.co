import React from 'react'

import { ChapterWithImage } from '../../../../pages/handbook'

import * as S from './styled'

interface FeaturedProps {
  featured: ChapterWithImage[]
}

const Featured = ({ featured }: FeaturedProps) => {
  return (
    <S.Wrapper>
      {featured.map(
        ({ chapter, chapter_link_description, chapter_link_text }, i) => {
          return (
            <S.BoxLink to={chapter.url} key={i}>
              <S.Content>
                <div>
                  <S.Title>{chapter.document.data.title}</S.Title>
                  <S.Text>{chapter_link_description}</S.Text>
                </div>
                <S.LinkHolder>
                  <S.LinkText>{chapter_link_text}</S.LinkText>
                  <S.RightArrow />
                </S.LinkHolder>
              </S.Content>
              <S.Image
                fluid={chapter.document.data.image.fluid}
                alt={chapter.document.data.image.alt}
              />
            </S.BoxLink>
          )
        }
      )}
    </S.Wrapper>
  )
}

export default Featured
