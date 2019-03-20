import React from 'react'
import { Theme } from '@theme'

import * as S from './styled'

const WhatMatters: React.FC<{}> = () => {
  return (
    <Theme theme="dark">
      <S.Wrapper>
        <S.Container>
          <S.Title>
            We’re always on the lookout for something that matters.
          </S.Title>
          <S.SubText>
            Passionate projects with bigger-than-themselves goals have a special
            place here at Significa.
          </S.SubText>
        </S.Container>
      </S.Wrapper>
    </Theme>
  )
}

export default WhatMatters
