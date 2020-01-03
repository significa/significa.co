// TODO: Page not ready

import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { BlogPost } from '../components/Blog/types'
import BlogList from '../components/Blog/List/List'

interface Prop {
  data: {
    allPrismicBlogPost: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const BlogAuthor: React.FC<Prop> = ({ data }) => {
  const posts = data.allPrismicBlogPost.edges

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
    allPrismicBlogPost(filter: { data: { author_slug: { eq: $uid } } }) {
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
                    position
                    social_links {
                      link
                      social
                    }
                    profile_pic {
                      localFile {
                        childImageSharp {
                          fluid {
                            ...GatsbyImageSharpFluid_withWebp_noBase64
                          }
                        }
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
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
            meta_image_share {
              localFile {
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
  }
`

export default BlogAuthor
