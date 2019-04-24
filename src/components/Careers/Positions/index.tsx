import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent } from '../../UI/Layout'
import { Big, Text } from '../../UI/Typography'
import * as S from './styled'
import coletivSrc from '../../../assets/images/coletiv.svg'

interface IPosition {
  position: string
  tagline: string
  company?: string
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

const Item = ({ position, tagline, company, slug }: IPosition) => {
  return (
    <S.PositionLink to={slug}>
      <S.PositionItem>
        <Big as="h4">
          {position}
          {company === 'Coletiv' && (
            <S.CompanyImage src={coletivSrc} alt="Coletiv" />
          )}
        </Big>
        <Text>{tagline}</Text>
      </S.PositionItem>
    </S.PositionLink>
  )
}

const Positions = () => {
  const {
    careersYaml: { positions },
    allMarkdownRemark: { edges },
  }: IPositions = useStaticQuery(careersPositionsQuery)

  return (
    <RightContent title={positions.title}>
      {edges.map(({ node: { frontmatter, fields } }) => {
        const mergedProps = { ...frontmatter, ...fields }
        return <Item {...mergedProps} key={frontmatter.position} />
      })}

      <Item {...positions.defaultPosition} slug="/contact" />
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
