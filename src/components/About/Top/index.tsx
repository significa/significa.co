import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import React from 'react'

import * as S from './styled'

type Data = {
  aboutYaml: {
    hero: {
      title: string
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

const Top = () => {
  const {
    aboutYaml: { hero: data },
  } = useStaticQuery<Data>(query)

  return (
    <>
      <S.TopWrapper>
        <S.Display>{data.title}</S.Display>
      </S.TopWrapper>
      <S.Gallery>
        {data.photos.map(({ image, alt }) => (
          <S.ImgHolder key={alt}>
            <Img alt={alt} fluid={image.childImageSharp.fluid} />
          </S.ImgHolder>
        ))}
      </S.Gallery>
    </>
  )
}

export default Top

export const query = graphql`
  query AboutHeroQuery {
    aboutYaml {
      hero {
        title
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
