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
          gatsbyImageData: IGatsbyImageData
        }
        topLeft: {
          gatsbyImageData: IGatsbyImageData
        }
        topRight: {
          gatsbyImageData: IGatsbyImageData
        }
        bottomLeft: {
          gatsbyImageData: IGatsbyImageData
        }
        bottomRight: {
          gatsbyImageData: IGatsbyImageData
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
              image={data.photos.topLeft.gatsbyImageData}
            />
            <S.CenterImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.center.gatsbyImageData}
            />
            <S.TopRightImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.topRight.gatsbyImageData}
            />
            <S.BottomLeftImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.bottomLeft.gatsbyImageData}
            />
            <S.BottomRightImage
              // TODO: change alt to a proper value
              alt="Image from image grid"
              image={data.photos.bottomRight.gatsbyImageData}
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
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
          topLeft {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
          topRight {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
          bottomLeft {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
          bottomRight {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`

export default ConnectedWhatMatters
