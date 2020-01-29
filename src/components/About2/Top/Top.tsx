import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import React, { useLayoutEffect } from 'react'

import { Theme } from '@theme'
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
  const [windowHeight, setWindowHeight] = React.useState<number>(1000)
  const data = useStaticQuery<Data>(graphql`
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
  `)

  const { scrollY } = useViewportScroll()
  const scale = useTransform(scrollY, [0, windowHeight * 8], [1, 80])
  const opacity = useTransform(
    scrollY,
    [0, windowHeight / 1.8, windowHeight / 1.4],
    [0, 0, 1]
  )

  useLayoutEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <Theme theme="dark">
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
          <S.Gallery>
            {data.aboutYaml.top.photos.map(({ image, alt }) => (
              <S.ImgHolder key={alt}>
                <Img alt={alt} fluid={image.childImageSharp.fluid} />
              </S.ImgHolder>
            ))}
          </S.Gallery>
        </S.Content>
      </S.Wrapper>
    </Theme>
  )
}

export default Top
