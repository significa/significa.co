import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/SEO'
import { Theme } from '@theme'
import Header from '../components/Header'

const IndexPage = () => (
  <>
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
  </>
)

export default IndexPage
