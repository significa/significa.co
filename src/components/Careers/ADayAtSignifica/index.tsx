import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import useMeasure from '../../../hooks/useMeasure'

import * as S from './styled'
import SunAndLogo from './SunAndLogo'

interface IGallery {
  alt: string
  image: {
    childImageSharp: {
      fluid: FluidObject
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
                  <S.TopImage key={i} alt={alt} fluid={childImageSharp.fluid} />
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
                    fluid={childImageSharp.fluid}
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        bottom {
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

export default Perks
