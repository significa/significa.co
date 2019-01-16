import React from 'react'

import Layout from '../Layout'
import SEO from '../components/SEO'

import { Huge } from '../components/UI/Typography'
import { Container } from '../components/UI/Layout'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Container style={{ marginTop: '120px' }}>
      <Huge style={{ maxWidth: '400px' }}>Your “go-to” digital agency</Huge>
    </Container>
  </Layout>
)

export default IndexPage
