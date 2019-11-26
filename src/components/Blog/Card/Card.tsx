import React from 'react'
import { Link } from 'gatsby'
import slugify from '@sindresorhus/slugify'

import { BlogPost } from '../types'
import formatDate from '../../../utils/formatDate'
import linkResolver from '../../../utils/linkResolver'
import AuthorBox from '../AuthorBox/AuthorBox'
import * as S from './styled'

const Card: React.FC<{ post: BlogPost }> = ({ post }) => {
  const slugifyCategory = slugify(post.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  return (
    <S.Article>
      <Link to={linkResolver(post._meta)}>
        <img width="300px" src={post.hero.url} alt={post.hero.alt} />
        <S.Title as="h2">{post.title}</S.Title>
        <S.Description as="p">{post.teaser}</S.Description>
      </Link>

      <S.Label color="secondary">
        <Link to={linkResolver(categoryMeta)}>
          <p>{post.category}</p>
        </Link>
        <span>{formatDate(post.date)}</span>
      </S.Label>

      <AuthorBox author={post.author} />
    </S.Article>
  )
}

export default Card
