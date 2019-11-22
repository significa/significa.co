import React from 'react'
import Image from 'gatsby-image'

import { Author } from '../types'
import * as S from './styled'

const AuthorBox: React.FC<{ author: Author }> = ({ author }) => {
  return (
    <S.Wrap>
      <S.ImageBox>
        <Image
          fluid={author.profile_picSharp.childImageSharp.fluid}
          alt={author.profile_pic.alt}
        />
      </S.ImageBox>

      <div>
        <S.Text>{author.name}</S.Text>
        <S.Text color="secondary">{author.position}</S.Text>
      </div>
    </S.Wrap>
  )
}

export default AuthorBox
