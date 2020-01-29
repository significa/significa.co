import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'

import Testimonial from 'components/Testimonial/Testimonial'
import { Container, Spacer } from 'components/UI'

import CallToAction from '../components/CallToAction/CallToAction'
import FromTheBlog from '../components/FromTheBlog'
import { About, MoreProjects, Services, Top } from '../components/Home/'
import Layout from '../components/Layout'
import ProjectsList from '../components/ProjectsList'
import SEO from '../components/SEO'

type Image = {
  childImageSharp: {
    fluid: FluidObject
  }
}

export type AboutSection = {
  title: string
  text: string
  cta: string
  images: {
    left1: Image
    left2: Image
    right1: Image
  }
}

export type ServicesSection = {
  title: string
  text: string
  cta: string
}

interface HomePageProps {
  data: {
    homeYaml: {
      top: string[]
      showcase: {
        text: string
        cta: string
      }
      services: ServicesSection
      about: AboutSection
    }
  }
}

const IndexPage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <Top top={data.homeYaml.top} />
      <ProjectsList limit={4} delay={data.homeYaml.top.length * 0.1} />
      <MoreProjects
        text={data.homeYaml.showcase.text}
        cta={data.homeYaml.showcase.cta}
      />
      <Services content={data.homeYaml.services} />
      <Spacer variant="large" spacing={{ top: [0, 0, 0] }}>
        <Container>
          <Testimonial />
        </Container>
      </Spacer>
      <About content={data.homeYaml.about} />
      <FromTheBlog />
      <CallToAction />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomepageQuery {
    homeYaml {
      top

      showcase {
        text
        cta
      }

      services {
        title
        text
        cta
      }

      about {
        title
        text
        cta
        images {
          left1 {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          left2 {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          right1 {
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
`
