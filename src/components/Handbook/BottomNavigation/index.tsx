import React from 'react'

import { NavigationChapter } from '../../../templates/handbook'

import * as S from './styled'

interface BottomNavigationProps {
  prevChapter?: NavigationChapter
  nextChapter?: NavigationChapter
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  prevChapter,
  nextChapter,
}) => {
  if (!prevChapter && !nextChapter) {
    return null
  }

  return (
    <S.Wrapper>
      {prevChapter && (
        <S.Box to={prevChapter.chapter.document.url}>
          <S.Header>
            <S.Prev>Previous</S.Prev>
            <S.LinkHolder>
              <S.LeftArrow />
              <S.Title>{prevChapter.chapter.document.data.title}</S.Title>
            </S.LinkHolder>
          </S.Header>
          <S.ImgHolder>
            <S.Image
              src={prevChapter.chapter.document.data.image.url}
              alt={prevChapter.chapter.document.data.image.alt}
            />
          </S.ImgHolder>
        </S.Box>
      )}

      {nextChapter && (
        <S.Box to={nextChapter.chapter.document.url}>
          <S.Header>
            <S.Next>Next</S.Next>
            <S.LinkHolder>
              <S.Title>{nextChapter.chapter.document.data.title}</S.Title>
              <S.RightArrow />
            </S.LinkHolder>
          </S.Header>
          <S.ImgHolder>
            <S.Image
              src={nextChapter.chapter.document.data.image.url}
              alt={nextChapter.chapter.document.data.image.alt}
            />
          </S.ImgHolder>
        </S.Box>
      )}
    </S.Wrapper>
  )
}

export default BottomNavigation
