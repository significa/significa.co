import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

import * as S from './styled'
import * as T from '../../UI/Typography'
import CompanyLogo, { CompanyType } from '../../utils/renderCompanyLogo'

interface ITeam {
  aboutYaml: {
    team: {
      title: string
      text: string
      list: Array<{
        name: string
        company: CompanyType
        role: string
        photo: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }>
    }
  }
}

const Team = () => {
  const {
    aboutYaml: { team },
  }: ITeam = useStaticQuery(query)

  const amountProletariat = team.list.length

  return (
    <S.Header>
      <S.Title>{team.title}</S.Title>
      <S.Text>
        {team.text.replace('{team_count}', String(amountProletariat))}
      </S.Text>

      <S.TeamList>
        {team.list.map(e => (
          <S.TeamItem key={e.name}>
            <S.TeamImage>
              <Img fluid={e.photo.childImageSharp.fluid} alt={e.name} />

              <S.CompanyLogo>
                {e.company && <CompanyLogo company={e.company} />}
              </S.CompanyLogo>
            </S.TeamImage>

            <T.Text>{e.name}</T.Text>
            <T.Label>{e.role}</T.Label>
          </S.TeamItem>
        ))}
      </S.TeamList>
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
          company
          photo {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`
