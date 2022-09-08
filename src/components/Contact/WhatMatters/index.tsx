import { StaticQuery, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { Theme } from '@theme'

import { textByLine } from '../../../utils/textByLine'
import * as S from './styled'

interface IWhatMatters {
  contactYaml: {
    matters: {
      title: string
      text: string
      more: string
      interested: string
      photos: {
        center: {
          childImageSharp: { gatsbyImageData: IGatsbyImageData }
        }
        topLeft: {
          childImageSharp: { gatsbyImageData: IGatsbyImageData }
        }
        topRight: {
          childImageSharp: { gatsbyImageData: IGatsbyImageData }
        }
        bottomLeft: {
          childImageSharp: { gatsbyImageData: IGatsbyImageData }
        }
        bottomRight: {
          childImageSharp: { gatsbyImageData: IGatsbyImageData }
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
            <S.TopLeftImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.topLeft.childImageSharp.gatsbyImageData}
            />
            <S.CenterImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.center.childImageSharp.gatsbyImageData}
            />
            <S.TopRightImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.topRight.childImageSharp.gatsbyImageData}
            />
            <S.BottomLeftImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.bottomLeft.childImageSharp.gatsbyImageData}
            />
            <S.BottomRightImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.bottomRight.childImageSharp.gatsbyImageData}
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
              gatsbyImageData
            }
          }
          topLeft {
            childImageSharp {
              gatsbyImageData
            }
          }
          topRight {
            childImageSharp {
              gatsbyImageData
            }
          }
          bottomLeft {
            childImageSharp {
              gatsbyImageData
            }
          }
          bottomRight {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default ConnectedWhatMatters
