import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import { Theme } from '@theme'
import { RightContent } from '../../UI'
import { textByLine } from '../../../utils/textByLine'
import * as S from './styled'
import { ArrowLink } from '../../UI/Links'

interface ICareers {
  aboutYaml: {
    careers: {
      title: string
      text: string
      link: string
      linkText: string
      photos: Array<{
        alt: string
        image: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
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
          <ArrowLink to={careers.link}>{careers.linkText}</ArrowLink>
        </RightContent>

        <S.Gallery>
          {careers.photos.map(({ image, alt }) => (
            <div key={alt}>
              <Img alt={alt} fluid={image.childImageSharp.fluid} />
            </div>
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`
