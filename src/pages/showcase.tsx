import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { media } from '@theme'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import CallToAction from '../components/CallToAction/CallToAction'
import ProjectsList from '../components/ProjectsList'

interface Showcase {
  data: {
    showcaseYaml: {
      seo: {
        title: string
        description: string
      }
    }
  }
}

const ProjectsHolder = styled.div`
  margin-top: 7.5rem;

  ${media.large} {
    margin-top: 5rem;
  }
`

const Showcase: React.FC<Showcase> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.showcaseYaml.seo.title}
        description={data.showcaseYaml.seo.description}
      />

      <ProjectsHolder>
        <ProjectsList />
      </ProjectsHolder>

      <CallToAction />
    </Layout>
  )
}

export default Showcase

export const query = graphql`
  query ShowcaseQuery {
    showcaseYaml {
      seo {
        title
        description
      }
    }
  }
`
