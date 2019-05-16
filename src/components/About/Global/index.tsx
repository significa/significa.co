import React from 'react'
import { FluidObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import { Theme } from '@theme'
import * as S from './styled'
import WorldMap from './WorldMap'

interface IGlobal {
  aboutYaml: {
    global: {
      title: string
      text: string
      cities: string[]
      image: {
        childImageSharp: {
          fluid: FluidObject
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
            <S.Img alt={data.title} fluid={data.image.childImageSharp.fluid} />
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
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        title
        text
      }
    }
  }
`
