import React from 'react'

import FooterNav from './FooterNav'
import * as S from './styled'

const Footer: React.FC<Record<string, never>> = () => (
  <S.Footer>
    <S.Container>
      <FooterNav />
    </S.Container>
  </S.Footer>
)

export default Footer
