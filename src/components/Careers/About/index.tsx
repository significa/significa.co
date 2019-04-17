import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import { RightContent } from '../../UI/Layout'

import * as S from './styled'

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
}

interface ICareersAbout {
  careersYaml: {
    about: {
      title: string
      sections: ISection[]
      cta: { link: string; linkText: string }
      images: IGallery[]
    }
  }
}

const About: React.FC = () => {
  const {
    careersYaml: { about },
  }: ICareersAbout = useStaticQuery(careersAboutQuery)

  const renderSection = ({ title, text }: ISection) => (
    <div key={title}>
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.SectionText>{text}</S.SectionText>
    </div>
  )

  const renderImages = (
    { image: { childImageSharp }, alt }: IGallery,
    i: number
  ) => (
    <S.GalleryImage
      width={childImageSharp.original.width / 2}
      height={childImageSharp.original.height / 2}
      alt={alt}
      key={i}
      fluid={childImageSharp.fluid}
    />
  )

  return (
    <S.Wrapper>
      <RightContent amountColumn={3} title={about.title}>
        <>
          <S.Section>{about.sections.map(renderSection)}</S.Section>
          <S.ArrowLink to={about.cta.link}>{about.cta.linkText}</S.ArrowLink>
        </>
      </RightContent>

      <S.Gallery>{about.images.map(renderImages)}</S.Gallery>
    </S.Wrapper>
  )
}

const careersAboutQuery = graphql`
  query CareersAboutQuery {
    careersYaml {
      about {
        title
        sections {
          title
          text
        }
        cta {
          link
          linkText
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

export default About
