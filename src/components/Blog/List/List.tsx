import React from 'react'

import { BlogPost } from '../types'
import Card from '../Card/Card'

const BlogList: React.FC<{ posts: Array<{ node: BlogPost }> }> = ({
  posts,
}) => {
  return (
    <section>
      {posts.map(({ node }) => {
        return <Card key={node._meta.uid} post={node} />
      })}
    </section>
  )
}

export default BlogList
