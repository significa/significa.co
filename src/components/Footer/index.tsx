import React from 'react'

import { Link } from '../UI/Links'
import { Small } from '../UI/Typography'

import * as S from './styled'
import FooterNav from './FooterNav'

const Footer: React.FC<{}> = () => (
  <S.Footer>
    <S.Container>
      <S.Left>
        <S.Segg />
        <Small>
          <Link to="/legal">Legal</Link>&nbsp;©&nbsp;{new Date().getFullYear()}
        </Small>
      </S.Left>
      <S.Right>
        <FooterNav />
      </S.Right>
    </S.Container>
  </S.Footer>
)

export default Footer
