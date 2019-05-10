import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

import { Theme } from '@theme'
import * as S from './styled'
import GlobalMap from './globalMap'

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
        <S.Container>
          <S.Image>
            <Img alt={data.title} fluid={data.image.childImageSharp.fluid} />
          </S.Image>

          <S.Header>
            <S.Title>{data.title}</S.Title>
            <S.Text>{data.text}</S.Text>
          </S.Header>

          <GlobalMap />
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
            fluid(maxWidth: 500) {
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
