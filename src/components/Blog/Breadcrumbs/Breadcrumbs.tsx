import React from 'react'

import * as S from './styled'
import { Container } from '../../UI'

interface Props {
  paths: Array<{ link: string; text: string }>
}

const Breadcrumbs: React.FC<Props> = ({ paths = [] }) => {
  return (
    <S.Wrapper>
      <Container>
        {paths.map(path => {
          return (
            <S.Item key={path.link} to={path.link}>
              {path.text}
            </S.Item>
          )
        })}
      </Container>
    </S.Wrapper>
  )
}

export default Breadcrumbs
