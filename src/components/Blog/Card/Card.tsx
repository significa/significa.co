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

  const postLink = linkResolver(post._meta)

  return (
    <S.Article>
      <Link to={postLink}>
        <S.Image>
          <img src={post.hero.url} alt={post.hero.alt} />
        </S.Image>
      </Link>

      <S.Content>
        <Link to={linkResolver(post._meta)}>
          <S.Title as="h2">{post.title}</S.Title>
          <S.Description as="p">{post.teaser}</S.Description>
        </Link>

        <AuthorBox compact author={post.author}>
          {/* render as children */}
          <span>·</span>
          <Link to={linkResolver(categoryMeta)}>
            <p>{post.category}</p>
          </Link>
          <span>·</span>
          {formatDate(post.date)}
        </AuthorBox>
      </S.Content>
    </S.Article>
  )
}

export default Card
