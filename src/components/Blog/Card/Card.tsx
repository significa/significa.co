import React from 'react'
import { Link } from 'gatsby'

import slugify from '@sindresorhus/slugify'

import { BlogPost } from '../types'
import formatDate from '../../../utils/formatDate'
import linkResolver from '../../../utils/linkResolver'
import AuthorBox from '../AuthorBox/AuthorBox'
import * as S from './styled'

const Card: React.FC<{ post: BlogPost }> = ({ post }) => {
  const slugifyCategory = slugify(post.data.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  const postLink = linkResolver(post)

  return (
    <S.Article>
      <S.HoverHint>
        <Link to={postLink}>
          <S.Image
            fluid={post.data.hero.fluid}
            alt={post.data.hero.alt}
          ></S.Image>
        </Link>

        <S.Content>
          <Link to={linkResolver(post)}>
            <S.Title as="h2">{post.data.title}</S.Title>
            <S.Description as="p">{post.data.teaser}</S.Description>
          </Link>
        </S.Content>
      </S.HoverHint>

      <AuthorBox compact author={post.data.author.document.data}>
        {/* render as children */}
        <span>·</span>
        <Link to={linkResolver(categoryMeta)}>{post.data.category}</Link>
        <span>·</span>
        {formatDate(post.data.date)}
      </AuthorBox>
    </S.Article>
  )
}

export default Card
