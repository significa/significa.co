import React from 'react'
import { Link } from 'gatsby'

import formatDate from '../../../utils/formatDate'
import linkResolver from '../../../utils/linkResolver'

import { BlogPost } from '../types'

const BlogList: React.FC<{ posts: Array<{ node: BlogPost }> }> = ({
  posts,
}) => {
  return (
    <>
      {posts.map(({ node }) => {
        return (
          <article key={node.title}>
            <Link to={linkResolver(node._meta)}>
              <img width="300px" src={node.hero.url} alt={node.hero.alt} />
              <h2>{node.title}</h2>
              <p>{node.teaser}</p>
              <p>{formatDate(node.date)}</p>
            </Link>
            <Link to={`/blog/category/`}>
              <p>{node.category}</p>
            </Link>

            <Link to={linkResolver(node.author._meta)}>
              <img
                width="300px"
                src={node.author.profile_pic.url}
                alt={node.author.profile_pic.alt}
              />

              <p>{node.author.name}</p>
            </Link>
          </article>
        )
      })}
    </>
  )
}

export default BlogList
