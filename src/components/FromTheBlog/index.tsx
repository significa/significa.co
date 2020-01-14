import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import formatDate from '../../utils/formatDate'
import linkResolver from '../../utils/linkResolver'
import AuthorBox from '../Blog/AuthorBox/AuthorBox'
import { Author } from '../Blog/types'
import { Big, Icon, RightContent } from '../UI/'
import * as S from './styled'

type Data = {
  partialsYaml: {
    fromTheBlog: {
      title: string
      cta: string
    }
  }
  allPrismicBlogPost: {
    edges: Array<{
      node: {
        uid: string
        type: string

        data: {
          title: string
          category: string
          date: string
          author: {
            document: {
              data: Pick<Author, 'name' | 'profile_pic'>
            }
          }
        }
      }
    }>
  }
}

const FromTheBlog: React.FC<{}> = () => {
  const {
    partialsYaml: { fromTheBlog },
    allPrismicBlogPost: { edges },
  } = useStaticQuery<Data>(fromTheBlogQuery)

  return (
    <S.Wrapper>
      <RightContent title={fromTheBlog.title}>
        <ul>
          {edges.map(({ node: post }, i) => {
            const postLink = linkResolver(post)

            return (
              <S.ListItem key={i}>
                <S.Link href={postLink}>
                  <S.Holder>
                    <div>
                      <Big>{post.data.title}</Big>

                      <S.Author>
                        <AuthorBox
                          compact
                          author={post.data.author.document.data}
                        >
                          <span>·</span>
                          {post.data.category}
                          <span>·</span>
                          {formatDate(post.data.date)}
                        </AuthorBox>
                      </S.Author>
                    </div>
                    <S.IconHolder>
                      <Icon asset="arrow" />
                    </S.IconHolder>
                  </S.Holder>
                </S.Link>
              </S.ListItem>
            )
          })}
        </ul>
        <S.ArrowLink highlight to={'/blog'}>
          {fromTheBlog.cta}
        </S.ArrowLink>
      </RightContent>
    </S.Wrapper>
  )
}

const fromTheBlogQuery = graphql`
  query FromTheBlogQuery {
    partialsYaml {
      fromTheBlog {
        title
        cta
      }
    }

    allPrismicBlogPost(limit: 3, sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          uid
          type

          data {
            title
            category
            date

            author {
              document {
                ... on PrismicBlogAuthor {
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
