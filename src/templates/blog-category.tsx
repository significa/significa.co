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
    prismic: {
      allBlog_posts: {
        edges: Array<{ node: BlogPost }>
      }
    }
  }
}

const BlogIndex: React.FC<Prop> = ({ data }) => {
  const posts = data.prismic.allBlog_posts.edges

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
  query BlogCategoryQuery($uid: String!) {
    prismic {
      allBlog_posts(sortBy: date_DESC, where: { category: $uid }) {
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
