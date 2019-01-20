import React from 'react'

import { IServicesContent } from '../../../pages'
import { Big } from '../../UI/Typography'
import { List } from '../../UI/List'
import { ArrowLink } from '../../UI/Links/ArrowLink'
import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'

const Services: React.FC<IServicesContent> = ({
  title,
  text,
  columns,
  cta,
  link,
}) => (
  <S.Container>
    <S.Left>
      <S.Title>{title}</S.Title>
    </S.Left>
    <S.TextContent>
      {textByLine(text).map((line, key) => (
        <Big key={key}>{line}</Big>
      ))}
    </S.TextContent>
    <S.Columns>
      {columns.map((column, i) => (
        <div key={i}>
          <S.Big>{column.title}</S.Big>
          <List items={column.items} />
        </div>
      ))}
    </S.Columns>
    <S.Bottom>
      <ArrowLink to={link}>{cta}</ArrowLink>
    </S.Bottom>
  </S.Container>
)

export { Services }
