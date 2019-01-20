import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import { RightContent } from '../UI/RightContent'
import { Big } from '../UI/Typography'
import { Dribbble } from './Dribbble'
import { Github } from './Github'
import { Medium } from './Medium'

import * as S from './styled'

interface IItem {
  title: string
  image: string
  more: string
  source: string
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

const icons: { [key: string]: any } = {
  dribbble: Dribbble,
  github: Github,
  medium: Medium,
}

class FromTheLabs extends React.Component {
  renderIcon = (source: string) => {
    const Icon = icons[source.toLowerCase()]

    return Icon ? (
      <S.IconHolder>
        <Icon />
      </S.IconHolder>
    ) : null
  }

  render() {
    return (
      <StaticQuery
        query={fromTheLabsQuery}
        render={({ labsYaml: { fromTheLabs, content } }: IFromTheLabsQuery) => (
          <RightContent title={fromTheLabs.title}>
            <ul>
              {content.slice(0, 3).map((item, i) => (
                <S.ListItem key={i}>
                  <S.Link href={item.link}>
                    {this.renderIcon(item.source)}
                    <Big>{item.title}</Big>
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
        image
        more
        source
        tag
        link
      }
    }
  }
`

export { FromTheLabs }
