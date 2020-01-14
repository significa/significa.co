import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { textByLine } from 'utils/textByLine'

import { RightContent, Spacer } from '../../UI'
import * as S from './styled'

type Data = {
  aboutYaml: {
    content: {
      title: string
      text: string
    }
  }
}

const Content = () => {
  const {
    aboutYaml: { content },
  } = useStaticQuery<Data>(query)

  return (
    <Spacer>
      <RightContent title={content.title}>
        {textByLine(content.text).map(e => (
          <S.Text key={e}>{e}</S.Text>
        ))}
      </RightContent>
    </Spacer>
  )
}

export default Content

export const query = graphql`
  query AboutContentQuery {
    aboutYaml {
      content {
        title
        text
      }
    }
  }
`
