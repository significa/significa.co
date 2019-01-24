import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const ThirdPage = () => (
  <Layout theme="dark">
    <SEO title="Page three" />
    <h1>THIIIIIIRDS</h1>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
    <p>
      <Link to="/page-2/">Page 2</Link>
    </p>
  </Layout>
)

export default ThirdPage
