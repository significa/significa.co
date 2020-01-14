import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import linkResolver from '../../../utils/linkResolver'
import { Big, RightContent, Spacer } from '../../UI/'
import * as S from './styled'

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
  allPrismicPosition: {
    edges: Array<{
      node: {
        type: string
        uid: string
        data: {
          tagline: string
          title: string
        }
      }
    }>
  }
}

interface ItemProps {
  doc: {
    uid: string
    type: string
    data: {
      tagline: string
      title: string
    }
  }
}

const Item = ({ doc }: ItemProps) => {
  return (
    <S.ListItem>
      <S.Link to={linkResolver(doc)}>
        <S.TitleWrapper>
          <Big as="h4">{doc.data.title}</Big>
        </S.TitleWrapper>
        <S.More>{doc.data.tagline}</S.More>
      </S.Link>
    </S.ListItem>
  )
}

const Positions = () => {
  const {
    careersYaml: { positions },
    allPrismicPosition: { edges },
  }: IPositions = useStaticQuery(careersPositionsQuery)

  return (
    <Spacer>
      <RightContent title={positions.title}>
        <ul>
          {edges.map(({ node }, i) => {
            return <Item doc={node} key={i} />
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
    </Spacer>
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
    allPrismicPosition {
      edges {
        node {
          type
          uid
          data {
            tagline
            title
          }
        }
      }
    }
  }
`

export default Positions
