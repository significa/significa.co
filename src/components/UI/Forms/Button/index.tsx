import React from 'react'

import * as S from './styled'

const ArrowLink: React.FC<any> = props => (
  <S.Button {...props}>
    {props.children}
    <S.Arrow />
  </S.Button>
)

export default ArrowLink
