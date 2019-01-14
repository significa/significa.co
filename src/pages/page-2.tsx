import React from 'react'
import { Link } from 'gatsby'

import Layout from '../Layout'
import SEO from '../components/SEO'

const SecondPage = () => (
  <Layout theme="dark">
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
    <p>
      <Link to="/page-3/">Page 3</Link>
    </p>
  </Layout>
)

export default SecondPage
