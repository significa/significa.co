import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { Theme } from '@theme'

import * as S from './styled'
import { textByLine } from '../../../utils/textByLine'

interface IWhatMatters {
  contactYaml: {
    matters: {
      title: string
      text: string
      more: string
      interested: string
      photos: {
        center: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        topLeft: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        topRight: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        bottomLeft: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        bottomRight: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }
}

const WhatMatters: React.FC<IWhatMatters> = ({
  contactYaml: { matters: data },
}) => {
  return (
    <Theme theme="dark">
      <S.Wrapper>
        <S.Container>
          <S.Title>{data.title}</S.Title>
          <S.SubText>{data.text}</S.SubText>

          <S.ImagesGrid>
            <S.TopLeftImage fluid={data.photos.topLeft.childImageSharp.fluid} />
            <S.CenterImage fluid={data.photos.center.childImageSharp.fluid} />
            <S.TopRightImage
              fluid={data.photos.topRight.childImageSharp.fluid}
            />
            <S.BottomLeftImage
              fluid={data.photos.bottomLeft.childImageSharp.fluid}
            />
            <S.BottomRightImage
              fluid={data.photos.bottomRight.childImageSharp.fluid}
            />
          </S.ImagesGrid>

          <S.MoreWrapper>
            {textByLine(data.more).map((line, i) => (
              <S.MoreContent key={i}>{line}</S.MoreContent>
            ))}
            <S.MoreContent>{data.interested}</S.MoreContent>
          </S.MoreWrapper>
        </S.Container>
      </S.Wrapper>
    </Theme>
  )
}

const ConnectedWhatMatters = () => {
  return (
    <StaticQuery
      query={whatMattersQuery}
      render={(data: IWhatMatters) => <WhatMatters {...data} />}
    />
  )
}

const whatMattersQuery = graphql`
  query WhatMattersQuery {
    contactYaml {
      matters {
        title
        text
        more
        interested
        photos {
          center {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          topLeft {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          topRight {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          bottomLeft {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          bottomRight {
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

export default ConnectedWhatMatters
