import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import { RightContent, Big, LabsIcon, LabsSourceType } from '../UI/'

import * as S from './styled'

interface IItem {
  link: string
  link_text: string
  source: LabsSourceType
  tagline: string
  title: string
  tags: Array<{
    tag: string
  }>
}

interface IFromTheLabsQuery {
  labsPageYaml: {
    fromTheLabs: {
      title: string
      cta: string
      link: string
    }
  }
  prismic: {
    allLab_entrys: {
      edges: Array<{
        node: IItem
      }>
    }
  }
}

const FromTheLabs: React.FC<{}> = () => {
  return (
    <StaticQuery
      query={fromTheLabsQuery}
      render={({
        labsPageYaml: { fromTheLabs },
        prismic: {
          allLab_entrys: { edges },
        },
      }: IFromTheLabsQuery) => (
        <S.Wrapper>
          <RightContent title={fromTheLabs.title}>
            <ul>
              {edges.map((item, i) => (
                <S.ListItem key={i}>
                  <S.Link href={item.node.link}>
                    {item.node.source && (
                      <S.IconHolder>
                        <LabsIcon
                          source={
                            item.node.source.toLowerCase() as LabsSourceType
                          }
                        />
                      </S.IconHolder>
                    )}
                    <Big>
                      {item.node.title} &mdash; {item.node.tagline}
                    </Big>
                    <S.More>{item.node.link_text}</S.More>
                  </S.Link>
                </S.ListItem>
              ))}
            </ul>
            <S.ArrowLink highlight to={fromTheLabs.link}>
              {fromTheLabs.cta}
            </S.ArrowLink>
          </RightContent>
        </S.Wrapper>
      )}
    />
  )
}

const fromTheLabsQuery = graphql`
  query FromTheLabsQuery {
    labsPageYaml {
      fromTheLabs {
        title
        cta
        link
      }
    }

    prismic {
      allLab_entrys(sortBy: meta_firstPublicationDate_DESC, first: 3) {
        edges {
          node {
            link
            link_text
            source
            tagline
            title
            tags {
              tag
            }
          }
        }
      }
    }
  }
`

export default FromTheLabs
