import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/SEO'

const ThirdPage = () => (
  <>
    <SEO title="Page three" />
    <h1>THIIIIIIRDS</h1>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
    <p>
      <Link to="/page-2/">Page 2</Link>
    </p>
  </>
)

export default ThirdPage
