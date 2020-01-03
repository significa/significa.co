import React, { useRef } from 'react'

import { BlogPost } from '../types'
import Card from '../Card/Card'
import * as S from './styled'
import useMeasure from '../../../hooks/useMeasure'

const ThumbHolder: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useMeasure(ref, 'article')
  const rowSpan = Math.ceil(height / 4)

  return (
    <div ref={ref} style={{ gridRowEnd: `span ${rowSpan}` }}>
      {children}
    </div>
  )
}

const BlogList: React.FC<{ posts: Array<{ node: BlogPost }> }> = ({
  posts,
}) => {
  return (
    <S.Container as="section">
      {posts.map(({ node }) => {
        return (
          <ThumbHolder key={node.uid}>
            <Card post={node} />
          </ThumbHolder>
        )
      })}
    </S.Container>
  )
}

export default BlogList
