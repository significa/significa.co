import React from 'react'

import { Big, Spacer } from '../../UI'
import * as S from './MoreProjects.styled'

type Props = {
  text: string
  cta: string
}

const MoreProjects: React.FC<Props> = ({ text, cta }) => {
  return (
    <S.Wrapper>
      <Spacer variant="small">
        <S.Holder>
          <Big>{text}</Big>
          <S.Link to="/showcase">{cta}</S.Link>
        </S.Holder>
      </Spacer>
    </S.Wrapper>
  )
}

export default MoreProjects
