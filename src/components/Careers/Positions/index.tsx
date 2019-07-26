import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent, Big, AdamantSmall, ColetivSmall } from '../../UI/'
import linkResolver from '../../../utils/linkResolver'

import * as S from './styled'

type CompanyType = 'Coletiv' | 'Adamant'
type AllCompaniesType = CompanyType | 'Significa'

interface IPositions {
  careersYaml: {
    positions: {
      title: string
      defaultPosition: {
        position: string
        tagline: string
      }
    }
  }
  prismic: {
    allPositions: {
      edges: Array<{
        node: {
          company: AllCompaniesType
          tagline: string
          title: string
          _meta: {
            type: string
            uid: string
          }
        }
      }>
    }
  }
}

interface ItemProps {
  position: string
  tagline: string
  doc: {
    uid: string
    type: string
  }
  company: AllCompaniesType
}

const renderCompany = (company: CompanyType) => {
  const logoComponents: { [K in CompanyType]: React.FC<any> } = {
    Coletiv: ColetivSmall,
    Adamant: AdamantSmall,
  }

  const ImageComponent = logoComponents[company]

  return <ImageComponent />
}

const Item = ({ position, tagline, doc, company }: ItemProps) => {
  return (
    <S.ListItem>
      <S.Link to={linkResolver(doc)}>
        <S.TitleWrapper>
          <Big as="h4">{position}</Big>
          {company && company !== 'Significa' && renderCompany(company)}
        </S.TitleWrapper>
        <S.More>{tagline}</S.More>
      </S.Link>
    </S.ListItem>
  )
}

const Positions = () => {
  const {
    careersYaml: { positions },
    prismic: {
      allPositions: { edges },
    },
  }: IPositions = useStaticQuery(careersPositionsQuery)

  return (
    <RightContent title={positions.title}>
      <ul>
        {edges.map(({ node }, i) => {
          return (
            <Item
              doc={node._meta}
              position={node.title}
              tagline={node.tagline}
              company={node.company}
              key={i}
            />
          )
        })}

        <S.ListItem>
          <S.Link to={'/contact'}>
            <S.TitleWrapper>
              <Big as="h4">{positions.defaultPosition.position}</Big>
            </S.TitleWrapper>
            <S.More>{positions.defaultPosition.tagline}</S.More>
          </S.Link>
        </S.ListItem>
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
    prismic {
      allPositions {
        edges {
          node {
            company
            tagline
            title
            _meta {
              type
              uid
            }
          }
        }
      }
    }
  }
`

export default Positions
