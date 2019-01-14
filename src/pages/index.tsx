import React from 'react'
import { Link } from 'gatsby'

import Layout from '../Layout'
import SEO from '../components/SEO'
import Header from '../components/Header'

import { Theme } from '@theme'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <p>
      <Link to="/page-2/">Go to page 2</Link>
    </p>
    <p>
      <Link to="/page-3/">Go to page 3</Link>
    </p>
    <Theme theme="dark">
      <Header />
    </Theme>
  </Layout>
)

export default IndexPage
