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
      original: { width: number; height: number }
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

  const renderImage = (
    { image: { childImageSharp }, alt }: IGallery,
    i: number
  ) => (
    <S.GalleryImage
      key={i}
      alt={alt}
      width={childImageSharp.original.width / 2}
      height={childImageSharp.original.height / 2}
      fluid={childImageSharp.fluid}
    />
  )

  return (
    <S.Wrapper>
      <S.TopGallery>{adayatsignifica.top.map(renderImage)}</S.TopGallery>

      <S.DayWrapper>
        <S.Day>
          <SunAndLogo />
        </S.Day>
      </S.DayWrapper>

      <S.BottomGallery>
        {adayatsignifica.bottom.map(renderImage)}
      </S.BottomGallery>
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
