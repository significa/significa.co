import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useCallback, useLayoutEffect } from 'react'

import ServicesBox from 'components/ServicesBox/ServicesBox'
import { ArrowLink, Spacer, Title } from 'components/UI'
import { ServicesSection } from 'pages/index'

import * as S from './Services.style'

type Props = {
  content: ServicesSection
}

const Services: React.FC<Props> = ({ content }) => {
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
          <S.TextHolder>
            <Title>{content.title}</Title>
            <S.Text>{content.text}</S.Text>
            <ArrowLink to="/services">{content.cta}</ArrowLink>
          </S.TextHolder>
        </S.TextContent>
        <S.Boxes>
          <S.BoxesLeft>
            <motion.div ref={ref} style={{ y }}>
              <ServicesBox
                title={content.design.title}
                link="/services/design"
                fluid={content.design.image.childImageSharp.fluid}
              />
            </motion.div>
          </S.BoxesLeft>
          <S.BoxesRight>
            <S.ShowOnSmall>
              <ServicesBox
                title={content.design.title}
                link="/services/design"
                fluid={content.design.image.childImageSharp.fluid}
              />
            </S.ShowOnSmall>
            <S.BoxHolder>
              <ServicesBox
                title={content.development.title}
                link="/services/development"
                fluid={content.development.image.childImageSharp.fluid}
              />
            </S.BoxHolder>
            <S.BoxHolder>
              <ServicesBox
                title={content.product.title}
                link="/services/product"
                fluid={content.product.image.childImageSharp.fluid}
              />
            </S.BoxHolder>
          </S.BoxesRight>
        </S.Boxes>
      </S.Wrapper>
    </Spacer>
  )
}

export default Services
