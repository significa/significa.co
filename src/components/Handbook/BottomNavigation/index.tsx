import React from 'react'

import { NavigationChapter } from '../../../templates/handbook'
import linkResolver from '../../../utils/linkResolver'

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
        <S.Box to={linkResolver(prevChapter.chapter._meta)}>
          <S.Prev>Previous</S.Prev>
          <S.LinkHolder>
            <S.LeftArrow />
            <S.Title>{prevChapter.chapter.title}</S.Title>
          </S.LinkHolder>
          <S.ImgHolder>
            <S.Image
              src={prevChapter.chapter.image.url}
              alt={prevChapter.chapter.image.alt}
            />
          </S.ImgHolder>
        </S.Box>
      )}

      {nextChapter && (
        <S.Box to={linkResolver(nextChapter.chapter._meta)}>
          <S.Next>Next</S.Next>
          <S.LinkHolder>
            <S.Title>{nextChapter.chapter.title}</S.Title>
            <S.RightArrow />
          </S.LinkHolder>
          <S.ImgHolder>
            <S.Image
              src={nextChapter.chapter.image.url}
              alt={nextChapter.chapter.image.alt}
            />
          </S.ImgHolder>
        </S.Box>
      )}
    </S.Wrapper>
  )
}

export default BottomNavigation
