import React from 'react'
import Image from 'gatsby-image'

import { Author } from '../types'
import * as S from './styled'

const AuthorBox: React.FC<{ author: Author; compact?: boolean }> = ({
  author,
  compact = false,
}) => {
  return (
    <S.Wrap>
      <S.ImageBox size={compact ? 'small' : 'regular'}>
        <Image
          fluid={author.profile_picSharp.childImageSharp.fluid}
          alt={author.profile_pic.alt}
        />
      </S.ImageBox>

      <div>
        {compact ? (
          <>
            <S.Label color="secondary">{author.name}</S.Label>
          </>
        ) : (
          <>
            <S.Text>{author.name}</S.Text>
            <S.Text color="secondary">{author.position}</S.Text>
          </>
        )}
      </div>
    </S.Wrap>
  )
}

export default AuthorBox
