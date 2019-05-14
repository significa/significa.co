import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent } from '../../UI'
import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'

interface IContent {
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
  }: IContent = useStaticQuery(query)

  return (
    <RightContent title={content.title}>
      {textByLine(content.text).map(e => (
        <S.Text key={e}>{e}</S.Text>
      ))}
    </RightContent>
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
