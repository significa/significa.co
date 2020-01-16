import Img from 'gatsby-image'
import React from 'react'

import { ArrowLink, Spacer } from 'components/UI'
import { AboutSection } from 'pages/index'
import { textByLine } from 'utils/textByLine'

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

        <S.Content>
          <S.Title>{content.title}</S.Title>
          {textByLine(content.text).map((line, i) => (
            <S.Text key={i}>{line}</S.Text>
          ))}
          <ArrowLink to="/about">{content.cta}</ArrowLink>
        </S.Content>
      </S.Wrapper>
    </Spacer>
  )
}

export default About
