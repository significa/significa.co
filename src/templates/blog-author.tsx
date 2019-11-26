import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { BlogPost } from '../components/Blog/types'
import BlogList from '../components/Blog/List/List'

interface Prop {
  data: {
    prismic: {
      allBlog_posts: {
        edges: Array<{ node: BlogPost }>
      }
    }
  }
}

const BlogAuthor: React.FC<Prop> = ({ data }) => {
  const posts = data.prismic.allBlog_posts.edges

  return (
    <Layout isBlogPage>
      <section>
        <BlogList posts={posts} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query BlogAuthorQuery($uid: String!) {
    prismic {
      allBlog_posts(where: { author_slug_fulltext: $uid }) {
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

export default BlogAuthor
