import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import useMeasure from '../../../hooks/useMeasure'

import * as S from './styled'
import SunAndLogo from './SunAndLogo'

interface IGallery {
  alt: string
  image: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

interface ICareersPerks {
  careersYaml: {
    adayatsignifica: {
      top: IGallery[]
      bottom: IGallery[]
    }
  }
}

const Perks: React.FC = () => {
  const {
    careersYaml: { adayatsignifica },
  }: ICareersPerks = useStaticQuery(careersADayAtSignificaQuery)

  const outerRef = React.useRef<HTMLDivElement>(null)
  const { width } = useMeasure(outerRef)

  return (
    <div ref={outerRef}>
      <S.Wrapper>
        <S.RelativeWrapper>
          <S.TopGallery>
            {adayatsignifica.top.map(
              ({ image: { childImageSharp }, alt }, i) => {
                return (
                  <S.TopImage
                    key={i}
                    alt={alt}
                    image={childImageSharp.gatsbyImageData}
                  />
                )
              }
            )}
          </S.TopGallery>

          {width >= 768 && (
            <S.Day>
              <SunAndLogo />
            </S.Day>
          )}
        </S.RelativeWrapper>

        {width >= 768 && (
          <S.BottomGallery>
            {adayatsignifica.bottom.map(
              ({ image: { childImageSharp }, alt }, i) => {
                return (
                  <S.BottomImage
                    key={i}
                    alt={alt}
                    image={childImageSharp.gatsbyImageData}
                  />
                )
              }
            )}
          </S.BottomGallery>
        )}
      </S.Wrapper>
    </div>
  )
}

const careersADayAtSignificaQuery = graphql`
  query CareersADayAtSignificaQuery {
    careersYaml {
      adayatsignifica {
        top {
          alt
          image {
            childImageSharp {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
        }
        bottom {
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

export default Perks
