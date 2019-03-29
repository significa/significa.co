import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Theme } from '@theme'

import * as S from './styled'
import { textByLine } from '../../../utils/textByLine'

interface IWhatMatters {
  contactYaml: {
    matters: {
      title: string
      text: string
      more: string
    }
  }
}

const WhatMatters: React.FC<IWhatMatters> = ({
  contactYaml: { matters: data },
}) => {
  return (
    <Theme theme="dark">
      <S.Wrapper>
        <S.Container>
          <S.Title>{data.title}</S.Title>
          <S.SubText>{data.text}</S.SubText>
          <S.MoreWrapper>
            {textByLine(data.more).map((line, i) => (
              <S.MoreContent key={i}>{line}</S.MoreContent>
            ))}
          </S.MoreWrapper>
        </S.Container>
      </S.Wrapper>
    </Theme>
  )
}

const ConnectedWhatMatters = () => {
  return (
    <StaticQuery
      query={whatMattersQuery}
      render={(data: IWhatMatters) => <WhatMatters {...data} />}
    />
  )
}

const whatMattersQuery = graphql`
  query WhatMattersQuery {
    contactYaml {
      matters {
        title
        text
        more
      }
    }
  }
`

export default ConnectedWhatMatters
