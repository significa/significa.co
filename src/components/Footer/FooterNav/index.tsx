import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { Link, Segg, Small, Social } from '../../UI/'
import * as S from './styled'

type Item = {
  label: string
  link: string
}

type Column = {
  node: {
    id: string
    title: string
    type: 'column' | 'social'
    items: Item[]
  }
}

type Data = {
  allFooterYaml: {
    edges: Column[]
  }
}

const FooterNav: React.FC = () => {
  const data = useStaticQuery<Data>(footerNavQuery)

  const { edges: columns } = data.allFooterYaml

  return (
    <>
      {columns.map(({ node: { id, title, type, items } }) => {
        if (title === 'Contact') {
          return (
            <div key={id}>
              <S.LogoLink to="/" title="Go to homepage">
                <Segg />
              </S.LogoLink>

              <S.ContactColumn>
                {items.map(({ label, link }, i) => (
                  <S.FooterLink key={i} to={link}>
                    {label}
                  </S.FooterLink>
                ))}
              </S.ContactColumn>

              <Small>
                <Link to="/legal">Legal</Link>&nbsp;©&nbsp;
                {new Date().getFullYear()}
              </Small>
            </div>
          )
        }

        if (type === 'social') {
          return (
            <div key={id}>
              <S.Title>{title}</S.Title>
              <S.Row>
                {items.map(({ label, link }, i) => (
                  <Social key={i} type={label} link={link} />
                ))}
              </S.Row>
            </div>
          )
        }

        return (
          <div key={id}>
            <S.Title>{title}</S.Title>
            <S.Column>
              {items.map(({ label, link }, i) => (
                <S.FooterLink key={i} to={link}>
                  {label}
                </S.FooterLink>
              ))}
            </S.Column>
          </div>
        )
      })}
    </>
  )
}

const footerNavQuery = graphql`
  query FooterNavQuery {
    allFooterYaml {
      edges {
        node {
          id
          title
          type
          items {
            label
            link
          }
        }
      }
    }
  }
`

export default FooterNav
