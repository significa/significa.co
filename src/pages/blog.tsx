import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { BlogPost } from '../components/Blog/types'
import BlogList from '../components/Blog/List/List'
import { Container } from '../components/UI'
import CategoriesTab from '../components/Blog/Categories/Categories'
import Hero from '../components/Blog/Hero/Hero'

interface Prop {
  data: {
    allPrismicBlogPost: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.allPrismicBlogPost.edges
  const [heroPost, ...allPosts] = posts

  return (
    <Layout theme="light" isBlogPage renderHeaderChildren={<CategoriesTab />}>
      <SEO title="Blog" />

      <Container>
        <Hero post={heroPost.node} />
        <BlogList posts={allPosts} />
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query BlogIndexQuery {
    allPrismicBlogPost(sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          uid
          type
          data {
            author {
              url
              document {
                ... on PrismicBlogAuthor {
                  uid
                  type
                  data {
                    name
                    profile_pic {
                      alt
                      url
                      fluid {
                        ...GatsbyPrismicImageFluid_noBase64
                      }
                    }
                  }
                }
              }
            }
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
          }
        }
      }
    }
  }
`
