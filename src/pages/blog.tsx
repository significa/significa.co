import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { BlogPost } from '../components/Blog/types'
import BlogList from '../components/Blog/List/List'

import { Container } from '../components/UI'

interface Prop {
  data: {
    prismic: {
      allBlog_posts: {
        edges: Array<{ node: BlogPost }>
      }
    }
  }
}

interface CategoryCounter {
  [key: string]: {
    counter: number
    icon: string
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.prismic.allBlog_posts.edges
  const categories: CategoryCounter = posts.reduce(
    (acc: CategoryCounter, curr) => {
      const categoryName = curr.node.category
      const defaultShape = { counter: 0 }
      const rest = acc[categoryName] || defaultShape

      return { ...acc, [categoryName]: { ...rest, counter: rest.counter + 1 } }
    },
    {}
  )

  return (
    <Layout theme="light">
      <SEO title="Blog" />

      <Container>
        <section>
          <BlogList posts={posts} />
        </section>

        <aside>
          <h2>We talk about</h2>

          {Object.keys(categories).map((item, index) => {
            return (
              <p key={index}>
                {item} {categories[item].counter} articles related
              </p>
            )
          })}
        </aside>
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query BlogIndexQuery {
    prismic {
      allBlog_posts {
        edges {
          node {
            _meta {
              uid
              type
            }
            author {
              ... on PRISMIC_Blog_author {
                _meta {
                  uid
                  type
                }
                name
                profile_pic
              }
            }
            category
            date
            title
            description
            hero
            meta_image_shareSharp {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
