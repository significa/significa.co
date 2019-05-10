import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import * as S from './styled'

const Team = () => {
  const {
    aboutYaml: { team },
  } = useStaticQuery(query)

  const amountProletariat = team.list.length

  return (
    <S.Header>
      <S.Title>{team.title}</S.Title>
      <S.Text>{team.text.replace('{team_count}', amountProletariat)}</S.Text>

      {team.list.map(e => (
        <div key={e.name}>
          {e.name}
          {e.role}
          {e.company}
        </div>
      ))}
    </S.Header>
  )
}

export default Team

export const query = graphql`
  query AboutTeamQuery {
    aboutYaml {
      team {
        title
        text
        list {
          name
          role
        }
      }
    }
  }
`
