import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { BlogPost } from '../components/Blog/types'
import BlogList from '../components/Blog/List/List'
import { Container } from '../components/UI'
import CategoriesTab from '../components/Blog/Categories/Categories'

interface Prop {
  data: {
    allPrismicBlogPost: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.allPrismicBlogPost.edges

  return (
    <Layout theme="light" renderHeaderChildren={<CategoriesTab />} isBlogPage>
      <SEO title="Blog" />

      <Container>
        <BlogList posts={posts} />
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query BlogCategoryQuery($category: String!) {
    allPrismicBlogPost(
      sort: { fields: data___date, order: DESC }
      filter: { data: { category: { eq: $category } } }
    ) {
      edges {
        node {
          uid
          type

          data {
            category
            date
            title
            teaser
            hero {
              alt
              url
              fluid {
                ...GatsbyPrismicImageFluid_noBase64
              }
            }
            meta_image_share {
              fluid(maxWidth: 500) {
                ...GatsbyPrismicImageFluid_noBase64
              }
            }

            author {
              url
              document {
                ... on PrismicBlogAuthor {
                  uid
                  type

                  data {
                    name
                    profile_pic {
                      fluid {
                        ...GatsbyPrismicImageFluid_noBase64
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
