import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'

interface ICareersHero {
  careersYaml: {
    hero: {
      title: string
      images: Array<{
        childImageSharp: {
          fluid: FluidObject
        }
      }>
    }
  }
}

const Hero: React.FC<ICareersHero> = ({
  careersYaml: {
    hero: { title, images },
  },
}) => {
  return (
    <S.Wrapper>
      {textByLine(title).map((line, i) => (
        <S.Display key={i}>{line}</S.Display>
      ))}
      <S.GalleryWrapper>
        {images.map(({ childImageSharp: { fluid, original } }, i) => (
          <S.GalleryImage
            key={i}
            fluid={fluid}
            width={original.width / 2}
            height={original.height / 2}
          />
        ))}
      </S.GalleryWrapper>
    </S.Wrapper>
  )
}

const ConnectedHero = () => {
  return (
    <StaticQuery
      query={careersHeroQuery}
      render={(data: ICareersHero) => <Hero {...data} />}
    />
  )
}

const careersHeroQuery = graphql`
  query CareersHeroQuery {
    careersYaml {
      hero {
        title
        images {
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
`

export default ConnectedHero
