import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/SEO'

const SecondPage = () => (
  <>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
    <p>
      <Link to="/page-3/">Page 3</Link>
    </p>
  </>
)

export default SecondPage
