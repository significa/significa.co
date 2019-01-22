import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { Wrapper, Title, Column, Row, FooterLink } from './styled'
import Social from '../Social'

interface IItemType {
  label: string
  link: string
}

interface IColumnType {
  node: {
    id: string
    title: string
    type: 'column' | 'social'
    items: IItemType[]
  }
}

interface INavFooterQuery {
  allFooterYaml: {
    edges: IColumnType[]
  }
}

class FooterNav extends React.Component<{}, {}> {
  renderSocialItems = (items: IItemType[]) => {
    return items.map(({ label, link }, i) => (
      <Social key={i} type={label} link={link} />
    ))
  }

  renderItems = (items: IItemType[]) => {
    return items.map(({ label, link }, i) => (
      <FooterLink key={i} to={link}>
        {label}
      </FooterLink>
    ))
  }

  renderColumns = (columns: IColumnType[]) => {
    return columns.map(({ node: { id, title, type, items } }) => {
      return type === 'social' ? (
        <div key={id}>
          <Title>{title}</Title>
          <Row>{this.renderSocialItems(items)}</Row>
        </div>
      ) : (
        <div key={id}>
          <Title>{title}</Title>
          <Column>{this.renderItems(items)}</Column>
        </div>
      )
    })
  }

  render() {
    return (
      <Wrapper>
        <StaticQuery
          query={footerNavQuery}
          render={(data: INavFooterQuery) => {
            const { edges: columns } = data.allFooterYaml
            return this.renderColumns(columns)
          }}
        />
      </Wrapper>
    )
  }
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
