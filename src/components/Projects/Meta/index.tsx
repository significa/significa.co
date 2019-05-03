import React from 'react'

import { Text, Big, List } from '../../UI/'

import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'

interface IMeta {
  description: string
  client?: string
  services?: string[]
  deliverables?: string[]
  links?: Array<{
    link: string
    linkText: string
  }>
}

const Meta: React.FC<IMeta> = ({
  description,
  client,
  services,
  deliverables,
  links,
}) => {
  return (
    <S.Container>
      <S.Top>
        {textByLine(description).map((line, i) => (
          <Big key={i}>{line}</Big>
        ))}
      </S.Top>
      <S.Bottom>
        {client && (
          <div>
            <S.Title>Client</S.Title>
            <Text>{client}</Text>
          </div>
        )}
        {services && (
          <div>
            <S.Title>Services</S.Title>
            <List items={services} />
          </div>
        )}
        {deliverables && (
          <div>
            <S.Title>Deliverables</S.Title>
            <List items={deliverables} />
          </div>
        )}
        {links && (
          <div>
            <S.Title>Links</S.Title>
            <List items={links} />
          </div>
        )}
      </S.Bottom>
    </S.Container>
  )
}

export default Meta
