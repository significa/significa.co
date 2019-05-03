import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Hero, Sections, Network } from '../components/Services'
import { CallToAction } from '../components/UI'

interface IContent {
  data: {
    servicesYaml: {
      seo: {
        title: string
      }
      cta: {
        title: string
        text: string
        link: string
        linkText: string
      }
    }
  }
}

const Contact: React.FC<IContent> = ({
  data: {
    servicesYaml: { seo, cta },
  },
}) => {
  return (
    <Layout>
      <SEO title={seo.title} />
      <Hero />
      <Sections />
      <Network />
      <CallToAction
        title={cta.title}
        text={cta.text}
        link={cta.link}
        linkText={cta.linkText}
      />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ServicesQuery {
    servicesYaml {
      seo {
        title
      }
      cta {
        title
        text
        link
        linkText
      }
    }
  }
`
