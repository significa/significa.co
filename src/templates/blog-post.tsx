import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Layout from '../components/Layout'
import { BlogPost } from '../components/Blog/types'
import formatDate from '../utils/formatDate'

interface Prop {
  data: { prismic: { blog_post: BlogPost } }
}

const BlogPostPage: React.FC<Prop> = ({ data }) => {
  const content = data.prismic.blog_post

  return (
    <Layout>
      <article key={content.title}>
        <img width="300px" src={content.hero.url} alt={content.hero.alt} />
        <h2>{content.title}</h2>
        <RichText render={content.description} />
        <p>{formatDate(content.date)}</p>

        <p>{content.category}</p>

        <img
          width="300px"
          src={content.author.profile_pic.url}
          alt={content.author.profile_pic.alt}
        />

        <p>{content.author.name}</p>

        <RichText render={content.content} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($uid: String!, $lang: String!) {
    prismic {
      blog_post(uid: $uid, lang: $lang) {
        author {
          ... on PRISMIC_Blog_author {
            name
            profile_pic
          }
        }
        title
        category
        date
        title
        description
        hero
        meta_title
        meta_description
        content
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
`
export default BlogPostPage
