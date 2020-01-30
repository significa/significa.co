import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { ThemeContext } from '@theme'
import { textByLine } from 'utils/textByLine'

import { ReactComponent as Egg } from './egg.svg'
import * as S from './Top.style'

type Data = {
  aboutYaml: {
    top: {
      title: string
      content: string
      photos: Array<{
        alt: string
        image: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }>
    }
  }
}

const Top = () => {
  const data = useStaticQuery<Data>(query)
  const [windowHeight, setWindowHeight] = React.useState<number>(1000)

  // Theme transition
  const { updateTheme } = React.useContext(ThemeContext)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const themeRef = useRef<string>('light')

  const onScroll = useCallback(() => {
    if (!galleryRef.current) {
      return null
    }

    if (galleryRef.current.getBoundingClientRect().top <= windowHeight / 2) {
      if (themeRef.current !== 'light') {
        themeRef.current = 'light'
        return updateTheme('light')
      }
    } else {
      if (themeRef.current === 'light') {
        themeRef.current = 'dark'
        return updateTheme('dark')
      }
    }
  }, [updateTheme, windowHeight])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Egg animation
  const { scrollY } = useViewportScroll()
  const scale = useTransform(scrollY, [0, windowHeight * 8], [1, 80])
  const opacity = useTransform(
    scrollY,
    [0, windowHeight / 2, windowHeight / 1.5],
    [0, 0, 1]
  )

  useLayoutEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <S.Wrapper>
      <S.EggOuterShell>
        <S.EggShell>
          <motion.div style={{ scale }}>
            <Egg />
          </motion.div>
        </S.EggShell>
      </S.EggOuterShell>
      <S.Content>
        <S.Inner>
          <motion.div style={{ opacity }}>
            <S.Title>{data.aboutYaml.top.title}</S.Title>
            {textByLine(data.aboutYaml.top.content).map((line, i) => (
              <S.Text key={i}>{line}</S.Text>
            ))}
          </motion.div>
        </S.Inner>
        <S.Gallery ref={galleryRef}>
          {data.aboutYaml.top.photos.map(({ image, alt }) => (
            <S.ImgHolder key={alt}>
              <Img alt={alt} fluid={image.childImageSharp.fluid} />
            </S.ImgHolder>
          ))}
        </S.Gallery>
      </S.Content>
    </S.Wrapper>
  )
}

export default Top

const query = graphql`
  query AboutTop {
    aboutYaml {
      top {
        title
        content
        photos {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`
