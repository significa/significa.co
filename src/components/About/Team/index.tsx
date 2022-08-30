import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

import * as T from '../../UI/Typography'
import * as S from './styled'

interface ITeam {
  aboutYaml: {
    team: {
      title: string
      text: string
      list: Array<{
        name: string
        role: string
      }>
    }
  }
}

const Team = () => {
  const {
    aboutYaml: { team },
  }: ITeam = useStaticQuery(query)

  const amountTeamMembers = team.list.length

  const orderTeamNameByAlphabet = team.list.sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <S.TeamWrapper>
      <S.Title>{team.title}</S.Title>
      <S.Text>
        {team.text.replace('{team_count}', String(amountTeamMembers))}
      </S.Text>

      <S.TeamList>
        {orderTeamNameByAlphabet.map(e => (
          <S.TeamItem key={e.name}>
            <T.Text>{e.name}</T.Text>
            <T.Label>{e.role}</T.Label>
          </S.TeamItem>
        ))}
      </S.TeamList>
    </S.TeamWrapper>
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
