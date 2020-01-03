import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from '@sindresorhus/slugify'

import { BlogPost } from '../types'
import linkResolver from '../../../utils/linkResolver'

import * as S from './styled'

type CategoryList = Array<{
  name: string
  type: 'blog_category'
  uid: string
}>

interface Prop {
  allPrismicBlogPost: {
    edges: Array<{ node: BlogPost }>
  }
}

const CategoriesTab: React.FC = () => {
  const data = useStaticQuery<Prop>(query)
  const posts = data.allPrismicBlogPost.edges

  const categories: CategoryList = posts.reduce((acc: CategoryList, curr) => {
    const alreadyIn =
      acc.findIndex(e => e.name === curr.node.data.category) !== -1

    if (!alreadyIn) {
      acc.push({
        name: curr.node.data.category,
        type: 'blog_category',
        uid: slugify(curr.node.data.category),
      })
    }

    return acc
  }, [])

  return (
    <S.Wrapper as="aside">
      <S.Container>
        <S.Item to="/blog">Blog</S.Item>

        {categories.map((item, index) => {
          return (
            <S.Item key={index} to={linkResolver(item)}>
              {item.name}
            </S.Item>
          )
        })}
      </S.Container>
    </S.Wrapper>
  )
}

export const query = graphql`
  query BlogCategoriesQuery {
    allPrismicBlogPost(sort: { fields: data___category, order: ASC }) {
      edges {
        node {
          data {
            category
          }
        }
      }
    }
  }
`

export default CategoriesTab
