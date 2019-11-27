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

interface Prop {
  data: { prismic: { blog_post: BlogPost } }
}

const BlogPostPage: React.FC<Prop> = ({ data }) => {
  const content = data.prismic.blog_post

  if (!content) {
    return null
  }

  const slugifyCategory = slugify(content.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  const breadcrumbPaths = [
    { text: 'Blog', link: '/blog' },
    { text: content.category, link: linkResolver(categoryMeta) },
    { text: content.title, link: linkResolver(content._meta) },
  ]

  return (
    <Layout
      isBlogPage
      renderHeaderChildren={<Breadcrumbs paths={breadcrumbPaths} />}
    >
      <SEO
        title={content.meta_title}
        description={content.meta_description}
        image={content.meta_image_shareSharp.childImageSharp.fixed.src}
      />

      <Container as="article">
        <S.Header>
          <S.Label as="p" color="secondary">
            {content.category} · {formatDate(content.date)}
          </S.Label>

          <S.Title as="h1">{content.title}</S.Title>
          <S.Description as="h2">{content.teaser}</S.Description>

          <AuthorBox author={content.author} />
        </S.Header>

        <S.ImageHero as="figure">
          <Image
            loading="eager"
            fluid={content.heroSharp.childImageSharp.fluid}
            alt={content.hero.alt}
          />
          <Label as="figcaption">{content.hero.alt}</Label>
        </S.ImageHero>

        <S.Content>
          <RichText render={content.content} htmlSerializer={syntaxHighlight} />
        </S.Content>

        <S.Footer>
          {content.tags.map(({ tag }) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}

          <S.AuthorSection>
            <S.Label as="p" color="secondary">
              Written by
            </S.Label>

            <S.AuthorSectionDetails>
              <div>
                <S.AuthorName>
                  <span>{content.author.name}</span> · {content.author.position}{' '}
                  @ Significa
                </S.AuthorName>
              </div>

              <S.AuthorSocials>
                {content.author.social_links.map(({ social, link }) => {
                  return (
                    <S.AuthorSocialLink
                      key={link}
                      type={social.toLowerCase()}
                      link={link}
                    />
                  )
                })}
              </S.AuthorSocials>
            </S.AuthorSectionDetails>

            <S.AuthorImage
              fluid={content.author.profile_picSharp.childImageSharp.fluid}
              alt={content.author.profile_pic.alt}
            />

            <S.Content>
              <RichText render={content.author.description} />
            </S.Content>
          </S.AuthorSection>
        </S.Footer>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($uid: String!, $lang: String!) {
    prismic {
      blog_post(uid: $uid, lang: $lang) {
        author {
          ... on PRISMIC_Blog_author {
            _meta {
              uid
              type
            }
            name
            position
            description
            social_links {
              link
              social
            }
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
        _meta {
          uid
          type
        }
        tags {
          tag
        }
        title
        category
        date
        title
        teaser
        hero
        heroSharp {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        meta_title
        meta_description
        content
        meta_image_shareSharp {
          childImageSharp {
            fixed(width: 1200, height: 600) {
              src
            }
          }
        }
        meta_image_share
      }
    }
  }
`
export default BlogPostPage
