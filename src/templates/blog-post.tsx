import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import Image from 'gatsby-image'
import slugify from '@sindresorhus/slugify'

import Layout from '../components/Layout'
import { BlogPost } from '../components/Blog/types'
import formatDate from '../utils/formatDate'
import { Container, Label } from '../components/UI'
import AuthorBox from '../components/Blog/AuthorBox/AuthorBox'
import SEO from '../components/SEO'
import syntaxHighlight from '../utils/syntaxHighlight'
import * as S from './blog-post.styled'
import Breadcrumbs from '../components/Blog/Breadcrumbs/Breadcrumbs'
import linkResolver from '../utils/linkResolver'
import AuthorSection from '../components/Blog/AuthorSection/AuthorSection'

interface Prop {
  data: { prismicBlogPost: BlogPost }
}

const BlogPostPage: React.FC<Prop> = ({ data }) => {
  const content = data.prismicBlogPost

  if (!content) {
    return null
  }

  const slugifyCategory = slugify(content.data.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  const breadcrumbPaths = [
    { text: 'Blog', link: '/blog' },
    { text: content.data.category, link: linkResolver(categoryMeta) },
    { text: content.data.title, link: linkResolver(content) },
  ]

  return (
    <Layout
      isBlogPage
      renderHeaderChildren={<Breadcrumbs paths={breadcrumbPaths} />}
    >
      <SEO
        title={content.data.meta_title}
        description={content.data.meta_description}
        image={
          content.data.meta_image_share.localFile.childImageSharp.fixed.src
        }
      />

      <Container as="article">
        <S.Header>
          <S.Label as="p" color="secondary">
            {content.data.category} · {formatDate(content.data.date)}
          </S.Label>

          <S.Title as="h1">{content.data.title}</S.Title>
          <S.Description as="h2">{content.data.teaser}</S.Description>

          <AuthorBox author={content.data.author.document[0].data} />
        </S.Header>

        <S.ImageHero as="figure">
          <Image
            loading="eager"
            fluid={content.data.hero.localFile.childImageSharp.fluid}
            alt={content.data.hero.alt}
          />
          <Label as="figcaption">{content.data.hero.alt}</Label>
        </S.ImageHero>

        <S.Content>
          <RichText
            render={content.data.content.raw}
            htmlSerializer={syntaxHighlight}
          />
        </S.Content>

        <S.Footer>
          {content.data.tags.map(({ tag }) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}

          <S.AuthorSection>
            <AuthorSection content={content.data.author.document[0].data} />
          </S.AuthorSection>
        </S.Footer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($uid: String!) {
    prismicBlogPost(uid: { eq: $uid }) {
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
                description {
                  html
                }
                social_links {
                  link
                  social
                }
                profile_pic {
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
              }
            }
          }
        }

        tags {
          tag
        }
        title
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
        meta_title
        meta_description
        content {
          html
          raw {
            label
            type
            text
            url
            alt
            dimensions {
              width
              height
            }
            spans {
              start
              end
              type
              data {
                link_type
                url
                target
              }
            }
          }
        }
        meta_image_share {
          localFile {
            childImageSharp {
              fixed(width: 1200, height: 600) {
                src
              }
            }
          }
        }
      }
    }
  }
`
export default BlogPostPage
