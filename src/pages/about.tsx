import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { Handbook, Office, Services, Team, Top } from 'components/About'
import CallToAction from 'components/CallToAction/CallToAction'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

type AboutData = {
  data: {
    aboutYaml: {
      seo: {
        title: string
        description: string
      }
    }
  }
}

const BackgroundTransition = styled.div`
  background: inherit;
  transition: background ${({ theme }) => theme.transitions.ease()};
`

const AboutPage: React.FC<AboutData> = ({ data }) => {
  return (
    <Layout theme="dark" transitionHeader>
      <BackgroundTransition>
        <SEO
          title={data.aboutYaml.seo.title}
          description={data.aboutYaml.seo.description}
        />

        <Top />
        <Services />
        <Handbook />
        <Team />

        <Office />

        <CallToAction />
      </BackgroundTransition>
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query AboutPage {
    aboutYaml {
      seo {
        title
        description
      }
    }
  }
`
