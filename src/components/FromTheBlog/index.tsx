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
  allPrismicBlogPost: {
    edges: Array<{
      node: BlogPost
    }>
  }
}

const FromTheBlog: React.FC<{}> = () => {
  return (
    <StaticQuery
      query={fromTheBlogQuery}
      render={({
        homeYaml: { fromTheBlog },
        allPrismicBlogPost: { edges },
      }: IFromTheBlogQuery) => {
        return (
          <S.Wrapper>
            <RightContent title={fromTheBlog.title}>
              <ul>
                {edges.map(({ node: post }, i) => {
                  const slugifyCategory = slugify(post.data.category)
                  const categoryMeta = {
                    type: 'blog_category',
                    uid: slugifyCategory,
                  }

                  const postLink = linkResolver(post)

                  return (
                    <S.ListItem key={i}>
                      <S.Link href={postLink}>
                        <Big>{post.data.title}</Big>
                        <S.More>{post.data.teaser}</S.More>
                      </S.Link>
                      <S.Author>
                        <AuthorBox
                          compact
                          author={post.data.author.document.data}
                        >
                          {/* render as children */}
                          <span>·</span>
                          <Link to={linkResolver(categoryMeta)}>
                            {post.data.category}
                          </Link>
                          <span>·</span>
                          {formatDate(post.data.date)}
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

const fromTheBlogQuery = graphql`
  query FromTheBlogQuery {
    homeYaml {
      fromTheBlog {
        title
        cta
        link
      }
    }

    allPrismicBlogPost(limit: 3, sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          uid
          type

          data {
            title
            teaser
            category
            date

            author {
              document {
                ... on PrismicBlogAuthor {
                  uid
                  type

                  data {
                    name
                    profile_pic {
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
    }
  }
`

export default FromTheBlog
