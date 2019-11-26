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
  const slugifyCategory = slugify(post.category)
  const categoryMeta = { type: 'blog_category', uid: slugifyCategory }

  const postLink = linkResolver(post._meta)

  return (
    <S.Article>
      <Link to={postLink}>
        <S.Image style={{ backgroundImage: `url(${post.hero.url})` }} />
      </Link>

      <S.Content>
        <S.Column>
          <S.Title as="h2">
            <Link to={postLink}>{post.title}</Link>
          </S.Title>
          <S.Description as="p">
            <Link to={postLink}>{post.teaser}</Link>
          </S.Description>
        </S.Column>

        <S.Column>
          <S.Detail>
            <AuthorBox compact author={post.author} />

            <S.Label color="secondary">
              <span>·</span>
              <Link to={linkResolver(categoryMeta)}>
                <p>{post.category}</p>
              </Link>
              <span>·</span>
              {formatDate(post.date)}
            </S.Label>
          </S.Detail>

          <ArrowLink to={postLink}>Read more</ArrowLink>
        </S.Column>
      </S.Content>
    </S.Article>
  )
}

export default Hero
