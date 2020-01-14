import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import * as React from 'react'

import { Theme } from '@theme'
import { textByLine } from 'utils/textByLine'

import { RightContent, Spacer } from '../../UI'
import * as S from './styled'

type Data = {
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
  } = useStaticQuery<Data>(query)

  return (
    <Theme theme="dark">
      <S.Wrapper>
        <Spacer>
          <RightContent title={careers.title}>
            {textByLine(careers.text).map(e => (
              <S.Text key={e}>{e}</S.Text>
            ))}
            <S.ArrowLink to={careers.link}>{careers.linkText}</S.ArrowLink>
          </RightContent>
        </Spacer>

        <S.Gallery>
          {careers.photos.map(({ image, alt }) => (
            <S.ImgHolder key={alt}>
              <Img alt={alt} fluid={image.childImageSharp.fluid} />
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
