import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'

import * as S from './AllServicesBoxes.style'
import ServicesBox from './ServicesBox'

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

const AllServicesBoxes = () => {
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

  return (
    <S.Wrapper>
      <ServicesBox
        title={services.design.title}
        link="/services/design"
        fluid={services.design.image.childImageSharp.fluid}
      />
      <ServicesBox
        title={services.development.title}
        link="/services/development"
        fluid={services.development.image.childImageSharp.fluid}
      />
      <ServicesBox
        title={services.product.title}
        link="/services/product"
        fluid={services.product.image.childImageSharp.fluid}
      />
    </S.Wrapper>
  )
}

export default AllServicesBoxes
