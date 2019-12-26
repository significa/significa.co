import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import slugify from '@sindresorhus/slugify'

import linkResolver from '../../utils/linkResolver'
import formatDate from '../../utils/formatDate'

import { RightContent, Big } from '../UI/'

import * as S from './styled'

import { BlogPost } from '../Blog/types'
import AuthorBox from '../Blog/AuthorBox/AuthorBox'

interface IFromTheBlogQuery {
  homeYaml: {
    fromTheBlog: {
      title: string
      cta: string
      link: string
    }
  }
  prismic: {
    allBlog_posts: {
      edges: Array<{
        node: BlogPost
      }>
    }
  }
}

const FromTheLabs: React.FC<{}> = () => {
  return (
    <StaticQuery
      query={fromTheLabsQuery}
      render={({
        homeYaml: { fromTheBlog },
        prismic: {
          allBlog_posts: { edges },
        },
      }: IFromTheBlogQuery) => {
        return (
          <S.Wrapper>
            <RightContent title={fromTheBlog.title}>
              <ul>
                {edges.map(({ node: post }, i) => {
                  const slugifyCategory = slugify(post.category)
                  const categoryMeta = {
                    type: 'blog_category',
                    uid: slugifyCategory,
                  }

                  const postLink = linkResolver(post._meta)

                  return (
                    <S.ListItem key={i}>
                      <S.Link href={postLink}>
                        <Big>{post.title}</Big>
                        <S.More>{post.teaser}</S.More>
                      </S.Link>
                      <S.Author>
                        <AuthorBox compact author={post.author}>
                          {/* render as children */}
                          <span>·</span>
                          <Link to={linkResolver(categoryMeta)}>
                            {post.category}
                          </Link>
                          <span>·</span>
                          {formatDate(post.date)}
                        </AuthorBox>
                      </S.Author>
                    </S.ListItem>
                  )
                })}
              </ul>
              <S.ArrowLink highlight to={fromTheBlog.link}>
                {fromTheBlog.cta}
              </S.ArrowLink>
            </RightContent>
          </S.Wrapper>
        )
      }}
    />
  )
}

const fromTheLabsQuery = graphql`
  query FromTheBlogQuery {
    homeYaml {
      fromTheBlog {
        title
        cta
        link
      }
    }

    prismic {
      allBlog_posts(first: 3, sortBy: date_DESC) {
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

export default FromTheLabs
