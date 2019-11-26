import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import slugify from '@sindresorhus/slugify'

import { BlogPost } from '../types'
import linkResolver from '../../../utils/linkResolver'
import { Container } from '../../UI'
import * as S from './styled'

type CategoryList = Array<{
  name: string
  _meta: {
    type: 'blog_category'
    uid: string
  }
}>

interface Prop {
  prismic: {
    allBlog_posts: {
      edges: Array<{ node: BlogPost }>
    }
  }
}

const CategoriesTab: React.FC = () => {
  const data = useStaticQuery<Prop>(query)
  const posts = data.prismic.allBlog_posts.edges

  const categories: CategoryList = posts.reduce((acc: CategoryList, curr) => {
    const alreadyIn = acc.findIndex(e => e.name === curr.node.category) !== -1

    if (!alreadyIn) {
      acc.push({
        name: curr.node.category,
        _meta: {
          type: 'blog_category',
          uid: slugify(curr.node.category)!,
        },
      })
    }

    return acc
  }, [])

  return (
    <S.Wrapper as="aside">
      <Container>
        <S.Item to="/blog">Blog</S.Item>

        {categories.map((item, index) => {
          return (
            <S.Item key={index} to={linkResolver(item._meta)}>
              {item.name}
            </S.Item>
          )
        })}
      </Container>
    </S.Wrapper>
  )
}

export const query = graphql`
  query BlogCategoriesQuery {
    prismic {
      allBlog_posts {
        edges {
          node {
            category
          }
        }
      }
    }
  }
`

export default CategoriesTab
