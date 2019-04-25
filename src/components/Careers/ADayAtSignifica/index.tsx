import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

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

  return (
    <S.Wrapper>
      <S.TopGallery>
        {adayatsignifica.top.map(({ image: { childImageSharp }, alt }, i) => {
          return <S.TopImage key={i} alt={alt} fluid={childImageSharp.fluid} />
        })}
      </S.TopGallery>

      {/* <S.DayWrapper>
        <S.Day>
          <SunAndLogo />
        </S.Day>
      </S.DayWrapper> */}

      {/* <S.BottomGallery>
        {adayatsignifica.bottom.map(renderImage)}
      </S.BottomGallery> */}
    </S.Wrapper>
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
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        bottom {
          alt
          image {
            childImageSharp {
              original {
                width
                height
              }
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default Perks
