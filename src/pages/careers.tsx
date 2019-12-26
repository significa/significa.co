import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

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
        description: string
      }
    }
  }
}

const Contact: React.FC<ICareers> = ({ data }) => {
  return (
    <Layout theme="light">
      <BackgroundTransition>
        <SEO
          title={data.careersYaml.seo.title}
          description={data.careersYaml.seo.description}
        />
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
        description
      }
    }
  }
`
