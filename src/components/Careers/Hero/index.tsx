import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'

interface IGallery {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
    alt: string
    original: {
      width: number
      height: number
    }
  }
}
interface ICareersHero {
  careersYaml: {
    hero: {
      title: string
      images: IGallery[]
    }
  }
}

const Hero: React.FC = () => {
  const {
    careersYaml: {
      hero: { title, images },
    },
  }: ICareersHero = useStaticQuery(careersHeroQuery)

  const renderGallery = ({ childImageSharp }: IGallery, i: number) => (
    <S.GalleryImage
      key={i}
      alt="Gallery Image"
      image={childImageSharp.gatsbyImageData}
      width={childImageSharp.original.width / 2}
      height={childImageSharp.original.height / 2}
    />
  )

  return (
    <S.PageContainer>
      <S.Wrapper>
        {textByLine(title).map((line, i) => (
          <React.Fragment key={i}>
            <S.Display>{line}</S.Display>{' '}
          </React.Fragment>
        ))}
      </S.Wrapper>

      <S.GalleryWrapper>{images.map(renderGallery)}</S.GalleryWrapper>
    </S.PageContainer>
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
            gatsbyImageData(width: 400, placeholder: NONE, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default Hero
