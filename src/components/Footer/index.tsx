import React from 'react'

import * as S from './styled'
import FooterNav from './FooterNav'

const Footer: React.FC<{}> = () => (
  <S.Footer>
    <S.Container>
      <FooterNav />
    </S.Container>
  </S.Footer>
)

export default Footer
