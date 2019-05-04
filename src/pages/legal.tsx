import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, Markdown } from '../components/UI'

interface ILegal {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string
          }
          html: string
        }
      }>
    }
  }
}

const Legal: React.FC<ILegal> = ({ data: { allMarkdownRemark } }) => {
  const content = allMarkdownRemark.edges[0].node

  return (
    <Layout>
      <SEO title={content.frontmatter.title} />
      <Container>
        <Markdown
          narrow
          bottomSpace
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </Container>
    </Layout>
  )
}

export default Legal

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/pages/legal/legal.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`
