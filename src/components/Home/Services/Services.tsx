import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React, { useCallback, useLayoutEffect } from 'react'

import ServicesBox from 'components/ServicesBox/ServicesBox'
import { Spacer } from 'components/UI'
import { ServicesSection } from 'pages/index'

import * as S from './Services.style'

type Props = {
  content: ServicesSection
}

type Image = {
  childImageSharp: {
    fluid: FluidObject
  }
}

export type ServiceType = {
  title: string
  link: string
  image: Image
}

type Data = {
  partialsYaml: {
    services: {
      design: ServiceType
      development: ServiceType
      product: ServiceType
    }
  }
}

const Services: React.FC<Props> = ({ content }) => {
  const {
    partialsYaml: { services },
  } = useStaticQuery<Data>(graphql`
    query {
      partialsYaml {
        services {
          design {
            title
            link
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          development {
            title
            link
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          product {
            title
            link
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
  `)

  const [offset, setOffset] = React.useState<number>(0)
  const [windowHeight, setWindowHeight] = React.useState<number>(0)
  const ref = React.useRef<HTMLDivElement | null>(null)

  const { scrollY } = useViewportScroll()
  const center = offset - windowHeight / 1.5
  const y = useTransform(
    scrollY,
    [center, center + windowHeight * 2],
    [0, (windowHeight * 1.5) / 2]
  )

  const setSizes = useCallback(() => {
    if (ref.current) {
      setOffset(ref.current.offsetTop)
    }
    setWindowHeight(window.innerHeight)
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', setSizes)
    setSizes()

    return () => {
      window.removeEventListener('resize', setSizes)
    }
  }, [setSizes])

  return (
    <Spacer variant="large" spacing={{ top: ['7em', '5em', '3em'] }}>
      <S.Wrapper>
        <S.TextContent>
          <S.TextHolder
            title={content.title}
            text={content.text}
            cta={{
              text: content.cta,
              link: '/services',
            }}
          />
        </S.TextContent>
        <S.Boxes>
          <S.BoxesLeft>
            <motion.div ref={ref} style={{ y }}>
              <ServicesBox
                title={services.design.title}
                link="/services/design"
                fluid={services.design.image.childImageSharp.fluid}
              />
            </motion.div>
          </S.BoxesLeft>
          <S.BoxesRight>
            <S.ShowOnSmall>
              <ServicesBox
                title={services.design.title}
                link="/services/design"
                fluid={services.design.image.childImageSharp.fluid}
              />
            </S.ShowOnSmall>
            <S.BoxHolder>
              <ServicesBox
                title={services.development.title}
                link="/services/development"
                fluid={services.development.image.childImageSharp.fluid}
              />
            </S.BoxHolder>
            <S.BoxHolder>
              <ServicesBox
                title={services.product.title}
                link="/services/product"
                fluid={services.product.image.childImageSharp.fluid}
              />
            </S.BoxHolder>
          </S.BoxesRight>
        </S.Boxes>
      </S.Wrapper>
    </Spacer>
  )
}

export default Services
