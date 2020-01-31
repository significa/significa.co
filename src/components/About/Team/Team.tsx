import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import React from 'react'

import { Container, Spacer, Text, Title } from 'components/UI'

import * as S from './Team.style'

type Data = {
  aboutYaml: {
    people: {
      title: string
      subtext: string
      cta: string
    }
  }
  allTeamYaml: {
    nodes: Array<{
      name: string
      role: string
      photo: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
      egg: {
        publicURL: string
      }
    }>
  }
}

const Team = () => {
  const {
    aboutYaml: { people: content },
    allTeamYaml: { nodes: data },
  } = useStaticQuery<Data>(query)

  return (
    <Spacer variant="large">
      <Container>
        <S.TitleHolder>
          <Title>{content.title}</Title>
        </S.TitleHolder>
        <S.TeamHolder>
          {data.map((person, i) => {
            return (
              <S.ImageHolder key={i}>
                <S.IconHolder>
                  <img
                    alt={`Illustration for ${person.name}`}
                    src={person.egg.publicURL}
                  />
                </S.IconHolder>
                <Img fluid={person.photo.childImageSharp.fluid} />
                <S.Name>{person.name}</S.Name>
                <Text color="secondary">{person.role}</Text>
              </S.ImageHolder>
            )
          })}
        </S.TeamHolder>

        <S.SubText
          maxWidth="18rem"
          text={content.subtext}
          cta={{ text: content.cta, link: '/careers ' }}
        />
      </Container>
    </Spacer>
  )
}

export default Team

const query = graphql`
  query AboutTeam {
    aboutYaml {
      people {
        title
        subtext
        cta
      }
    }
    allTeamYaml {
      nodes {
        name
        role
        photo {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        egg {
          publicURL
        }
      }
    }
  }
`
