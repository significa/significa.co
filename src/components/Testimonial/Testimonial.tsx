import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React, { useEffect, useState } from 'react'

import { lightTheme, Theme } from '@theme'
import { Text } from 'components/UI'

import * as S from './Testimonial.style'

type SingleTestimonial = {
  quote: string
  name: string
  position: string
  cta: string
  path: string
  photo: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  theme: {
    background: string
    foreground: string
    highlight: string
  }
}

type Data = {
  allTestimonialsYaml: {
    nodes: SingleTestimonial[]
  }
}

const Testimonial = () => {
  const {
    allTestimonialsYaml: { nodes: items },
  } = useStaticQuery<Data>(graphql`
    {
      allTestimonialsYaml {
        nodes {
          quote
          name
          position
          cta
          path
          photo {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          theme {
            background
            foreground
            highlight
          }
        }
      }
    }
  `)

  const getRandom = (): SingleTestimonial => {
    return items[Math.floor(Math.random() * items.length)]
  }

  const [item, setItem] = useState<SingleTestimonial>(getRandom())

  useEffect(() => {
    // Randomize client-side
    setItem(getRandom())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Theme
      theme={{
        ...lightTheme,
        background: item.theme.background,
        foreground: item.theme.foreground,
        highlight: item.theme.highlight,
      }}
    >
      <S.Wrapper>
        <S.Content>
          <S.Title>{item.quote}</S.Title>
          <S.ContentFooter>
            <div>
              <Text>{item.name}</Text>
              <Text>{item.position}</Text>
            </div>
            <S.Link to={item.path}>{item.cta}</S.Link>
          </S.ContentFooter>
        </S.Content>
        <S.Img fluid={item.photo.childImageSharp.fluid} />
      </S.Wrapper>
    </Theme>
  )
}

export default Testimonial
