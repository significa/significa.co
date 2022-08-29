import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import * as S from './styled'

interface ITop {
  aboutYaml: {
    hero: {
      title: string
      photos: Array<{
        alt: string
        image: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }>
    }
  }
}

const Top = () => {
  const {
    aboutYaml: { hero: data },
  }: ITop = useStaticQuery(query)

  return (
    <>
      <S.TopWrapper>
        <S.Display>{data.title}</S.Display>
      </S.TopWrapper>
      <S.Gallery>
        {data.photos.map(({ image, alt }) => (
          <S.ImgHolder key={alt}>
            <GatsbyImage
              image={image.childImageSharp.gatsbyImageData}
              alt={alt}
            />
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
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
