import Img from 'gatsby-image'
import React from 'react'

import { Spacer } from 'components/UI'
import { AboutSection } from 'pages/index'

import * as S from './About.style'

type Props = {
  content: AboutSection
}

const About: React.FC<Props> = ({ content }) => {
  return (
    <Spacer variant="large" spacing={{ top: [0, 0, 0] }}>
      <S.Wrapper>
        <S.Images>
          <S.ImagesLeft>
            <Img fluid={content.images.left1.childImageSharp.fluid} />
            <Img fluid={content.images.left2.childImageSharp.fluid} />
          </S.ImagesLeft>
          <S.ImagesRight>
            <Img fluid={content.images.right1.childImageSharp.fluid} />
          </S.ImagesRight>
        </S.Images>

        <S.Content
          maxWidth="30rem"
          title={content.title}
          text={content.text}
          cta={{ text: content.cta, link: '/about ' }}
        />
      </S.Wrapper>
    </Spacer>
  )
}

export default About
