import React, { useState } from 'react'

import { ILabType } from '../../../pages/labs'
import { Big } from '../../UI'

import * as S from './styled'

interface IAll {
  content: ILabType[]
  tags: Array<{
    label: string
    tag: string
  }>
}

type FilterState = string | null

const All: React.FC<IAll> = ({ content, tags }) => {
  const [filter, setFilter] = useState<FilterState>(null)
  const items = !filter ? content : content.filter(c => c.tag === filter)

  return (
    <S.Wrapper>
      <S.Sidebar>
        <S.Filter active={!filter} onClick={() => setFilter(null)}>
          All
        </S.Filter>
        {tags.map(tag => {
          return (
            <S.Filter
              key={tag.tag}
              active={filter === tag.tag}
              onClick={() => setFilter(tag.tag)}
            >
              {tag.label}
            </S.Filter>
          )
        })}
      </S.Sidebar>
      <div>
        {items.map(item => {
          return (
            <S.ItemLink key={`${item.title}-${item.tagline}`} href={item.link}>
              <S.ImgHolder>
                <S.LabsIcon source={item.source} color />
                <S.Img fluid={item.image.childImageSharp.fluid} />
              </S.ImgHolder>
              <S.ContentHolder>
                <Big>
                  {item.title} &mdash; {item.tagline}
                </Big>
                <S.More>{item.more}</S.More>
              </S.ContentHolder>
            </S.ItemLink>
          )
        })}
      </div>
    </S.Wrapper>
  )
}

export default All
