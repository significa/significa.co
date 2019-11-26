import React from 'react'

import { BlogPost } from '../types'
import Card from '../Card/Card'
import * as S from './styled'

const BlogList: React.FC<{ posts: Array<{ node: BlogPost }> }> = ({
  posts,
}) => {
  return (
    <S.Container as="section">
      {posts.map(({ node }) => {
        return <Card key={node._meta.uid} post={node} />
      })}
    </S.Container>
  )
}

export default BlogList
