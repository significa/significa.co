import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Form, Contacts, WhatMatters } from '../components/Contact'

interface IContent {
  data: {
    contactYaml: {
      seo: {
        title: string
      }
    }
  }
}

const Contact: React.FC<IContent> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contactYaml.seo.title} />
      <Form />
      <WhatMatters />
      <Contacts />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ContactQuery {
    contactYaml {
      seo {
        title
      }
    }
  }
`