import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { Theme } from '@theme'

import WorldMap from './WorldMap'
import * as S from './styled'

interface IGlobal {
  aboutYaml: {
    global: {
      title: string
      text: string
      cities: string[]
      image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
}

const Global = () => {
  const {
    aboutYaml: { global: data },
  }: IGlobal = useStaticQuery(query)

  return (
    <Theme theme="dark">
      <S.Wrapper>
        <S.ImageContainer>
          <S.ImageHolder>
            <S.Img
              alt={data.title}
              image={data.image.childImageSharp.gatsbyImageData}
            />
          </S.ImageHolder>
        </S.ImageContainer>

        <S.Container>
          <S.TextContent>
            <S.Title>{data.title}</S.Title>
            <S.Text>{data.text}</S.Text>
          </S.TextContent>

          <WorldMap />
        </S.Container>
      </S.Wrapper>
    </Theme>
  )
}

export default Global

export const query = graphql`
  query AboutGlobalQuery {
    aboutYaml {
      global {
        image {
          childImageSharp {
            gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
          }
        }
        title
        text
      }
    }
  }
`
