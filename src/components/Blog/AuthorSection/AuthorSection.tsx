import React from 'react'
import { Author } from '../types'
import { RichText } from 'prismic-reactjs'

import * as S from './styled'

const AuthorSection: React.FC<{ content: Author }> = ({ content }) => {
  return (
    <S.Wrapper>
      {content.profile_picSharp && (
        <S.Image
          fluid={content.profile_picSharp.childImageSharp.fluid}
          alt={content.profile_pic.alt}
        />
      )}

      <S.Content>
        <S.Header>
          <div>
            <S.Title as="h2">{content.name}</S.Title>
            <S.Description as="p" color="secondary">
              {content.position} @ Significa
            </S.Description>
          </div>
        </S.Header>

        <S.FormatContent>
          <RichText render={content.description} />
        </S.FormatContent>

        <S.Socials>
          {content.social_links.map(({ social, link }) => {
            return (
              <S.SocialLink
                key={link}
                type={social.toLowerCase()}
                link={link}
              />
            )
          })}
        </S.Socials>
      </S.Content>
    </S.Wrapper>
  )
}

export default AuthorSection
