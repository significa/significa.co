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
    prismic: {
      allBlog_posts: {
        edges: Array<{ node: BlogPost }>
      }
    }
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.prismic.allBlog_posts.edges
  const [heroPost, ...allPosts] = posts

  return (
    <Layout theme="light" renderHeaderChildren={<CategoriesTab />}>
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
    prismic {
      allBlog_posts(sortBy: date_DESC) {
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
                profile_picSharp {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
            }
            category
            date
            title
            teaser
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
