import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import * as S from './styled'
import { textByLine } from '../../../../utils/textByLine'

interface ISuccessProps {
  goBack: () => void
}

interface ISuccessData {
  careersYaml: {
    positions: {
      success: {
        title: string
        subtitle: string
        back: string
      }
    }
  }
}

const Success: React.FC<ISuccessProps> = ({ goBack }) => {
  const { careersYaml: data }: ISuccessData = useStaticQuery(
    positionFormSuccessQuery
  )

  return (
    <S.Wrapper>
      {textByLine(data.positions.success.title).map((line, key) => (
        <S.Title key={key}>{line}</S.Title>
      ))}
      {textByLine(data.positions.success.subtitle).map((line, key) => (
        <S.Text key={key}>{line}</S.Text>
      ))}

      <S.Button onClick={goBack} to="/careers">
        {data.positions.success.back}
      </S.Button>
    </S.Wrapper>
  )
}

const positionFormSuccessQuery = graphql`
  query positionFormSuccessQuery {
    careersYaml {
      positions {
        success {
          title
          subtitle
          back
        }
      }
    }
  }
`

export default Success
