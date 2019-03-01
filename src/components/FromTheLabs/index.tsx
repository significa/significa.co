import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import { RightContent, Big, LabsIcon, LabsSourceType } from '../UI/'

import * as S from './styled'

interface IItem {
  title: string
  tagline: string
  more: string
  source: LabsSourceType
  tag: string
  link: string
}

interface IFromTheLabsQuery {
  labsYaml: {
    fromTheLabs: {
      title: string
      cta: string
      link: string
    }
    content: IItem[]
  }
}

const FromTheLabs: React.FC<{}> = () => {
  return (
    <StaticQuery
      query={fromTheLabsQuery}
      render={({ labsYaml: { fromTheLabs, content } }: IFromTheLabsQuery) => (
        <RightContent title={fromTheLabs.title}>
          <ul>
            {content.slice(0, 3).map((item, i) => (
              <S.ListItem key={i}>
                <S.Link href={item.link}>
                  {item.source && (
                    <S.IconHolder>
                      <LabsIcon
                        source={item.source.toLowerCase() as LabsSourceType}
                      />
                    </S.IconHolder>
                  )}
                  <Big>
                    {item.title} &mdash; {item.tagline}
                  </Big>
                  <S.More>{item.more}</S.More>
                </S.Link>
              </S.ListItem>
            ))}
          </ul>
          <S.ArrowLink highlight to={fromTheLabs.link}>
            {fromTheLabs.cta}
          </S.ArrowLink>
        </RightContent>
      )}
    />
  )
}

const fromTheLabsQuery = graphql`
  query FromTheLabsQuery {
    labsYaml {
      fromTheLabs {
        title
        cta
        link
      }
      content {
        title
        tagline
        more
        source
        tag
        link
      }
    }
  }
`

export default FromTheLabs
