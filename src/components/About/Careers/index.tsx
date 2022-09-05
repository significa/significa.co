import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import * as React from 'react'

import { Theme } from '@theme'

import { textByLine } from '../../../utils/textByLine'
import { RightContent } from '../../UI'
import * as S from './styled'

interface ICareers {
  aboutYaml: {
    careers: {
      title: string
      text: string
      link: string
      linkText: string
      photos: Array<{
        alt: string
        image: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
      }>
    }
  }
}

const Careers = () => {
  const {
    aboutYaml: { careers },
  }: ICareers = useStaticQuery(query)

  return (
    <Theme theme="dark">
      <S.Wrapper>
        <RightContent title={careers.title}>
          {textByLine(careers.text).map(e => (
            <S.Text key={e}>{e}</S.Text>
          ))}
          <S.ArrowLink to={careers.link}>{careers.linkText}</S.ArrowLink>
        </RightContent>

        <S.Gallery>
          {careers.photos.map(({ image, alt }) => (
            <S.ImgHolder key={alt}>
              <GatsbyImage
                image={image.childImageSharp.gatsbyImageData}
                alt={alt}
              />
            </S.ImgHolder>
          ))}
        </S.Gallery>
      </S.Wrapper>
    </Theme>
  )
}

export default Careers

export const query = graphql`
  query AboutCareersQuery {
    aboutYaml {
      careers {
        title
        text
        link
        linkText
        photos {
          alt
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
