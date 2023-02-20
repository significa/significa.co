import { graphql } from 'gatsby'
import React from 'react'

import CategoriesTab from '../components/Blog/Categories/Categories'
import Hero from '../components/Blog/Hero/Hero'
import BlogList from '../components/Blog/List/List'
import { BlogPost } from '../components/Blog/types'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container } from '../components/UI'

interface Prop {
  data: {
    allPrismicBlogPost: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.allPrismicBlogPost.edges
  const listedPosts = posts.filter(post => post.node.data.listed)
  const [heroPost, ...allPosts] = listedPosts

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
                      gatsbyImageData
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
              gatsbyImageData
            }
            listed
          }
        }
      }
    }
  }
`
