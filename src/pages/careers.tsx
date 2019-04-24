import React from 'react'
import { graphql } from 'gatsby'
import styled from '@theme'

const BackgroundTransition = styled.div`
  background: inherit;
  transition: background ${({ theme }) => theme.transitions.ease('400ms')};
`

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import {
  Hero,
  About,
  ADayAtSignifica,
  Perks,
  Positions,
} from '../components/Careers'

interface ICareers {
  data: {
    careersYaml: {
      seo: {
        title: string
      }
    }
  }
}

const Contact: React.FC<ICareers> = ({ data }) => {
  return (
    <Layout theme="dark" footerTheme="light">
      <BackgroundTransition>
        <SEO title={data.careersYaml.seo.title} />
        <Hero />
        <About />
        <ADayAtSignifica />
        <Perks />
        <Positions />
      </BackgroundTransition>
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query CareersQuery {
    careersYaml {
      seo {
        title
      }
    }
  }
`
