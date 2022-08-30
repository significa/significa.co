import React from 'react'

import { Container } from '../../UI'
import * as S from './styled'

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
