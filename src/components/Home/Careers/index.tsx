import React from 'react'
import Img from 'gatsby-image'

import { textByLine } from '../../../utils/textByLine'

import { ICareersContent } from '../../../pages'
import { ArrowLink } from '../../UI/'

import * as S from './styled'

const Careers: React.FC<ICareersContent> = ({
  title,
  text,
  cta,
  link,
  photos,
}) => (
  <>
    <S.Container>
      <S.Left>
        <S.Title>
          {textByLine(title).map(l => {
            return (
              <React.Fragment key={l}>
                {l}
                <br />
              </React.Fragment>
            )
          })}
        </S.Title>
      </S.Left>
      <S.Right>
        <S.Big>{text}</S.Big>
        <ArrowLink highlight to={link}>
          {cta}
        </ArrowLink>
      </S.Right>
      <S.Photos>
        {photos.map((photo, i) => (
          <div key={i}>
            <Img fluid={photo.childImageSharp.fluid} />
          </div>
        ))}
      </S.Photos>
    </S.Container>
  </>
)

export default Careers
