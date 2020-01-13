import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import * as S from './styled'
import { textByLine } from '../../../../utils/textByLine'

type Props = {
  goBack: () => void
}

type Data = {
  contactYaml: {
    success: {
      title: string
      subtitle: string
      back: string
    }
  }
}

const Success: React.FC<Props> = ({ goBack }) => {
  const data = useStaticQuery<Data>(contactFormSuccessQuery)

  return (
    <S.Wrapper>
      {textByLine(data.contactYaml.success.title).map((line, key) => (
        <S.Title key={key}>{line}</S.Title>
      ))}
      {textByLine(data.contactYaml.success.subtitle).map((line, key) => (
        <S.Text key={key}>{line}</S.Text>
      ))}

      <S.Button onClick={goBack} to="/contact">
        {data.contactYaml.success.back}
      </S.Button>
    </S.Wrapper>
  )
}

const contactFormSuccessQuery = graphql`
  query ContactFormSuccessQuery {
    contactYaml {
      success {
        title
        subtitle
        back
      }
    }
  }
`

export default Success
