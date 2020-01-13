import React from 'react'
import { Link } from 'gatsby'
import slugify from '@sindresorhus/slugify'

import { BlogPost } from '../types'
import formatDate from '../../../utils/formatDate'
import linkResolver from '../../../utils/linkResolver'
import AuthorBox from '../AuthorBox/AuthorBox'
import { ArrowLink } from '../../UI'
import * as S from './styled'

const Hero: React.FC<{ post: BlogPost }> = ({ post }) => {
  const slugifyCategory = slugify(post.data.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  const postLink = linkResolver(post)

  return (
    <S.Article>
      <Link to={postLink}>
        <S.Image
          fluid={post.data.hero.fluid}
          alt={post.data.title}
          loading="eager"
        />
      </Link>

      <S.Content>
        <S.Column>
          <S.Title as="h2">
            <Link to={postLink}>{post.data.title}</Link>
          </S.Title>
          <S.Description as="p">
            <Link to={postLink}>{post.data.teaser}</Link>
          </S.Description>
        </S.Column>

        <S.Column>
          <S.Detail>
            <AuthorBox compact author={post.data.author.document.data}>
              {/* render as children */}
              <span>·</span>
              <Link to={linkResolver(categoryMeta)}>{post.data.category}</Link>
              <span>·</span>
              {formatDate(post.data.date)}
            </AuthorBox>
          </S.Detail>

          <ArrowLink to={postLink}>Read more</ArrowLink>
        </S.Column>
      </S.Content>
    </S.Article>
  )
}

export default Hero
