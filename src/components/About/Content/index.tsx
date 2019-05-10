import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import styled from '@theme'
import { RightContent, Text as BaseText } from '../../UI'
import { textByLine } from '../../../utils/textByLine'

interface IContent {
  aboutYaml: {
    content: {
      title: string
      text: string
    }
  }
}

const Text = styled(BaseText)`
  margin-bottom: 1em;
`

const Content = () => {
  const {
    aboutYaml: { content },
  }: IContent = useStaticQuery(query)

  return (
    <RightContent title={content.title}>
      {textByLine(content.text).map(e => (
        <Text key={e}>{e}</Text>
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
