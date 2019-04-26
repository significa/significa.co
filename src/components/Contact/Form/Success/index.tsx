import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import * as S from './styled'
import { textByLine } from '../../../../utils/textByLine'

interface ISuccessProps {
  goBack: () => void
}

interface ISuccessData {
  contactYaml: {
    success: {
      title: string
      subtitle: string
      back: string
    }
  }
}

const Success = ({ goBack }: ISuccessProps) => {
  return (
    <StaticQuery
      query={contactFormSuccessQuery}
      render={(data: ISuccessData) => {
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
      }}
    />
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
