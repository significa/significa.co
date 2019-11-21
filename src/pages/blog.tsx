import React from 'react'
import { graphql, Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { BlogPost } from '../components/Blog/types'
import formatDate from '../utils/formatDate'
import slugify from '../utils/slugify'

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

      <aside>
        <h2>We talk about</h2>

        {Object.keys(categories).map(item => {
          return (
            <p>
              {item} {categories[item].counter} articles related
            </p>
          )
        })}
      </aside>
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
