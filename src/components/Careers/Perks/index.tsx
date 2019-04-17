import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { ThemeContext } from '@theme'

import { RightContent } from '../../UI/Layout'
import useIntersection from '../../../hooks/useIntersection'
import * as S from './styled'
import ADayAtSignifica from './ADayAtSignifica'
import Circle from './Circle'

interface IGallery {
  alt: string
  image: {
    childImageSharp: {
      fluid: FluidObject
      original: { width: number; height: number }
    }
  }
}

interface ISection {
  title: string
  text: string
  image: {
    publicURL: string
  }
}

interface ICareersPerks {
  careersYaml: {
    perks: {
      title: string
      list: ISection[]
      images: IGallery[]
    }
  }
}

const Perks: React.FC = () => {
  const { updateTheme } = React.useContext(ThemeContext)
  const { observerEntry, elRef } = useIntersection({ rootMargin: '-30%' })

  React.useEffect(() => {
    if (observerEntry && observerEntry.isIntersecting) {
      updateTheme('light')
    } else {
      updateTheme('dark')
    }
  }, [observerEntry])

  const {
    careersYaml: { perks },
  }: ICareersPerks = useStaticQuery(careersPerksQuery)

  const renderImages = (
    { image: { childImageSharp }, alt }: IGallery,
    i: number
  ) => (
    <S.GalleryImage
      width={childImageSharp.original.width}
      height={childImageSharp.original.height}
      alt={alt}
      key={i}
      fluid={childImageSharp.fluid}
    />
  )

  const renderPeeks = ({ title, text, image }: ISection) => (
    <div>
      <img src={image.publicURL} alt={title} />
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.SectionText>{text}</S.SectionText>
    </div>
  )

  return (
    <S.Wrapper ref={elRef}>
      <S.Title>
        <S.HandleSvg>
          <Circle />
        </S.HandleSvg>
        <ADayAtSignifica />
      </S.Title>

      <S.Gallery>{perks.images.map(renderImages)}</S.Gallery>

      <RightContent amountColumn={4} title={perks.title}>
        <S.Section>{perks.list.map(renderPeeks)}</S.Section>
      </RightContent>
    </S.Wrapper>
  )
}

const careersPerksQuery = graphql`
  query CareersPerksQuery {
    careersYaml {
      perks {
        title
        list {
          title
          text
          image {
            publicURL
          }
        }
        images {
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
