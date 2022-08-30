import slugify from '@sindresorhus/slugify'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import React from 'react'

import AuthorBox from '../components/Blog/AuthorBox/AuthorBox'
import AuthorSection from '../components/Blog/AuthorSection/AuthorSection'
import Breadcrumbs from '../components/Blog/Breadcrumbs/Breadcrumbs'
import { BlogPost } from '../components/Blog/types'
import Layout from '../components/Layout'
import Image from '../components/PrismicImage'
import SEO from '../components/SEO'
import { Container, Label } from '../components/UI'
import formatDate from '../utils/formatDate'
import linkResolver from '../utils/linkResolver'
import syntaxHighlight from '../utils/syntaxHighlight'
import * as S from './blog-post.styled'

interface Prop {
  data: { prismicBlogPost: BlogPost }
}

const BlogPostPage: React.FC<Prop> = ({ data }) => {
  // const preview = typeof window !== 'undefined' && window.__PRISMIC_PREVIEW__

  // const data: Prop['data'] = mergePrismicPreviewData({
  //   staticData,
  //   previewData: preview,
  // })

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
          content.data.meta_image_share.fixed
            ? content.data.meta_image_share.fixed.src
            : content.data.meta_image_share.url
        }
      />

      <Container as="article">
        <S.Header>
          <S.Label as="p" color="secondary">
            {content.data.category} · {formatDate(content.data.date)}
          </S.Label>

          <S.Title as="h1">{content.data.title}</S.Title>
          <S.Description as="h2">{content.data.teaser}</S.Description>

          <AuthorBox author={content.data.author.document.data} />
        </S.Header>

        <S.ImageHero as="figure">
          {content.data.hero && (
            <>
              <Image
                loading="eager"
                image={content.data.hero.gatsbyImageData}
                src={content.data.hero.url}
                alt={content.data.hero.alt}
              />
              <Label as="figcaption">{content.data.hero.alt}</Label>
            </>
          )}
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
            <AuthorSection content={content.data.author.document.data} />
          </S.AuthorSection>
        </S.Footer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ($uid: String!) {
    prismicBlogPost(uid: { eq: $uid }) {
      uid
      type

      data {
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
          fluid {
            ...GatsbyPrismicImageFluid_noBase64
          }
        }
        meta_title
        meta_description
        content {
          html
          raw
        }

        meta_image_share {
          fixed(width: 1200, height: 600) {
            src
          }
        }

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
                  fluid {
                    ...GatsbyPrismicImageFluid_noBase64
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
export default BlogPostPage
