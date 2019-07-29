import React, { useState } from 'react'

import { ILabType } from '../../../pages/labs'
import { Big } from '../../UI'

import * as S from './styled'

interface IAll {
  content: Array<{ node: ILabType }>
}

type FilterState = string | null

const All: React.FC<IAll> = ({ content }) => {
  const tags = content.reduce((acc: string[], item: { node: ILabType }) => {
    item.node.tags.forEach(tag => {
      if (acc.indexOf(tag.tag) < 0) {
        acc.push(tag.tag)
      }
    })

    return acc
  }, [])
  const [filter, setFilter] = useState<FilterState>(null)
  const items = !filter
    ? content
    : content.filter(c => {
        const itemTags = c.node.tags.map(tag => tag.tag)
        return itemTags.indexOf(filter) >= 0
      })

  return (
    <S.Wrapper>
      <S.Sidebar>
        <S.Filter active={!filter} onClick={() => setFilter(null)}>
          All
        </S.Filter>
        {tags.map(tag => {
          return (
            <S.Filter
              key={tag}
              active={filter === tag}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </S.Filter>
          )
        })}
      </S.Sidebar>
      <div>
        {items.map(item => {
          return (
            <S.ItemLink
              key={`${item.node.title}-${item.node.tagline}`}
              href={item.node.link}
            >
              <S.ImgHolder>
                <S.LabsIcon source={item.node.source} color />
                <S.Img
                  fluid={item.node.imageSharp.childImageSharp.fluid}
                  alt={item.node.image.alt}
                />
              </S.ImgHolder>
              <S.ContentHolder>
                <Big>
                  {item.node.title} &mdash; {item.node.tagline}
                </Big>
                <S.More>{item.node.link_text}</S.More>
              </S.ContentHolder>
            </S.ItemLink>
          )
        })}
      </div>
    </S.Wrapper>
  )
}

export default All
