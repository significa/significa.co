import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent, Big, AdamantSmall, ColetivSmall } from '../../UI/'

import * as S from './styled'

type CompanyType = 'coletiv' | 'adamant'
type AllCompaniesType = CompanyType | 'significa'

interface IPosition {
  position: string
  tagline: string
  company: AllCompaniesType
  slug: string
}

interface IPositions {
  careersYaml: {
    positions: {
      title: string
      defaultPosition: IPosition
    }
  }
  allMarkdownRemark: {
    edges: Array<{
      node: {
        frontmatter: IPosition
        fields: {
          slug: string
        }
      }
    }>
  }
}

const renderCompany = (company: CompanyType) => {
  const logoComponents: { [K in CompanyType]: React.FC<any> } = {
    coletiv: ColetivSmall,
    adamant: AdamantSmall,
  }

  const ImageComponent = logoComponents[company]

  return <ImageComponent />
}

const Item = ({ position, tagline, company, slug, ...props }: IPosition) => {
  return (
    <S.ListItem {...props}>
      <S.Link to={slug}>
        <S.TitleWrapper>
          <Big as="h4">{position}</Big>
          {company && company !== 'significa' && renderCompany(company)}
        </S.TitleWrapper>
        <S.More>{tagline}</S.More>
      </S.Link>
    </S.ListItem>
  )
}

const Positions = () => {
  const {
    careersYaml: { positions },
    allMarkdownRemark: { edges },
  }: IPositions = useStaticQuery(careersPositionsQuery)

  return (
    <RightContent title={positions.title}>
      <ul>
        {edges.map(({ node: { frontmatter, fields } }, i) => {
          const mergedProps = { ...frontmatter, ...fields }
          return <Item {...mergedProps} key={i} />
        })}

        <Item {...positions.defaultPosition} slug="/contact" />
      </ul>
    </RightContent>
  )
}

const careersPositionsQuery = graphql`
  query CareersPositionsQuery {
    careersYaml {
      positions {
        title
        defaultPosition {
          position
          tagline
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { position: { ne: null } } }) {
      edges {
        node {
          frontmatter {
            position
            tagline
            company
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Positions
