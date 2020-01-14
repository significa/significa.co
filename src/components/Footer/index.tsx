import React from 'react'

import FooterNav from './FooterNav'
import * as S from './styled'

const Footer: React.FC<{}> = () => (
  <S.Footer>
    <S.Container>
      <FooterNav />
    </S.Container>
  </S.Footer>
)

export default Footer
