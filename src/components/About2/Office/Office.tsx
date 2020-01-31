import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import React from 'react'

import { Theme } from '@theme'
import { Container, Spacer, Text } from 'components/UI'

import * as S from './Office.style'

type Image = {
  childImageSharp: {
    fluid: FluidObject
  }
}

type Data = {
  aboutYaml: {
    office: {
      title: string
      text: string
      subtext: string
      cta: string
      link: string
      photos: {
        topleft: Image
        bottomleft: Image
        center: Image
        topright: Image
        bottomright: Image
      }
    }
  }
}

const Office = () => {
  const {
    aboutYaml: { office },
  } = useStaticQuery<Data>(query)

  return (
    <Theme theme="dark">
      <S.Wrapper>
        <Spacer>
          <Container>
            <S.TextContent
              title={office.title}
              text={office.text}
              maxWidth="30rem"
            />

            <S.Gallery>
              <S.Left>
                <Img fluid={office.photos.topleft.childImageSharp.fluid} />
                <Img fluid={office.photos.bottomleft.childImageSharp.fluid} />
              </S.Left>
              <S.Middle>
                <Img fluid={office.photos.center.childImageSharp.fluid} />
              </S.Middle>
              <S.Right>
                <Img fluid={office.photos.topright.childImageSharp.fluid} />
                <Img fluid={office.photos.bottomright.childImageSharp.fluid} />
              </S.Right>
            </S.Gallery>

            <S.SubContent>
              <Text>{office.subtext}</Text>
              <S.SubLink to={office.link}>{office.cta}</S.SubLink>
            </S.SubContent>
          </Container>
        </Spacer>
      </S.Wrapper>
    </Theme>
  )
}

export default Office

const query = graphql`
  query AboutOffice {
    aboutYaml {
      office {
        title
        text
        subtext
        cta
        link
        photos {
          topleft {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          bottomleft {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          center {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          topright {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          bottomright {
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
