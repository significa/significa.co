import React, { useState } from 'react'

import { ILabType } from '../../../pages/labs'
import { Big } from '../../UI'

import * as S from './styled'

interface IAll {
  content: Array<{ node: { data: ILabType } }>
}

type FilterState = string | null

const All: React.FC<IAll> = ({ content }) => {
  const tags = content.reduce(
    (acc: string[], item: { node: { data: ILabType } }) => {
      item.node.data.tags.forEach(tag => {
        if (acc.indexOf(tag.tag) < 0) {
          acc.push(tag.tag)
        }
      })

      return acc
    },
    []
  )
  const [filter, setFilter] = useState<FilterState>(null)
  const items = !filter
    ? content
    : content.filter(c => {
        const itemTags = c.node.data.tags.map(tag => tag.tag)
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
              key={`${item.node.data.title}-${item.node.data.tagline}`}
              href={item.node.data.link}
            >
              <S.ImgHolder>
                <S.LabsIcon source={item.node.data.source} color />
                <S.Img
                  fluid={item.node.data.image.fluid}
                  alt={item.node.data.image.alt}
                />
              </S.ImgHolder>
              <S.ContentHolder>
                <Big>{item.node.data.title}</Big>
                <S.Tagline>{item.node.data.tagline}</S.Tagline>
                <S.More>
                  {item.node.data.tags.map(t => t.tag).join(', ')}
                </S.More>
              </S.ContentHolder>
            </S.ItemLink>
          )
        })}
      </div>
    </S.Wrapper>
  )
}

export default All
