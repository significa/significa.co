import React from 'react'
import { graphql, Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Layout from '../components/Layout'
import { BlogPost } from '../components/Blog/types'
import slugify from '../utils/slugify'
import formatDate from '../utils/formatDate'

interface Prop {
  data: {
    prismic: {
      allBlog_posts: {
        edges: Array<{ node: BlogPost }>
      }
    }
  }
}

const BlogAuthor: React.FC<Prop> = ({ data, ...props }) => {
  const posts = data.prismic.allBlog_posts.edges

  return (
    <Layout>
      <section>
        {posts.map(({ node }) => {
          return (
            <article key={node.title}>
              <Link to={`/blog/${slugify(node.title)}`}>
                <img width="300px" src={node.hero.url} alt={node.hero.alt} />
                <h2>{node.title}</h2>
                <RichText render={node.description} />
                <p>{formatDate(node.date)}</p>
              </Link>
              <Link to={`/blog/category/${slugify(node.category)}`}>
                <p>{node.category}</p>
              </Link>

              <Link to={`/blog/author/${slugify(node.author.name)}`}>
                <img
                  width="300px"
                  src={node.author.profile_pic.url}
                  alt={node.author.profile_pic.alt}
                />

                <p>{node.author.name}</p>
              </Link>
            </article>
          )
        })}
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
            author {
              ... on PRISMIC_Blog_author {
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

export default BlogAuthor
