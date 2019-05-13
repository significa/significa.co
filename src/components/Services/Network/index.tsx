import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Theme } from '@theme'
import { Container, Text } from '../../UI'
import CompanyLogo, { CompanyType } from '../../utils/renderCompanyLogo'
import * as S from './styled'

interface IServicesNetworkContent {
  servicesYaml: {
    network: {
      title: string
      text: string
      companies: Array<{
        name: CompanyType
        title: string
        text: string
        url: string
        prettyUrl: string
      }>
    }
  }
}

const Network = () => {
  const {
    servicesYaml: { network: data },
  }: IServicesNetworkContent = useStaticQuery(query)

  return (
    <Theme theme="dark">
      <S.Wrapper>
        <Container>
          <S.TextContent>
            <S.Title>{data.title}</S.Title>
            <S.Text>{data.text}</S.Text>
          </S.TextContent>
          <S.CardHolder>
            {data.companies.map((company, i) => {
              return (
                <S.Card key={i}>
                  <S.LogoHolder>
                    <CompanyLogo company={company.name} />
                  </S.LogoHolder>
                  <S.CardTitle>{company.title}</S.CardTitle>
                  <Text>{company.text}</Text>
                  <S.Link to={company.url}>{company.prettyUrl}</S.Link>
                </S.Card>
              )
            })}
          </S.CardHolder>
        </Container>
      </S.Wrapper>
    </Theme>
  )
}

const query = graphql`
  query ServicesNetwork {
    servicesYaml {
      network {
        title
        text
        companies {
          name
          title
          text
          url
          prettyUrl
        }
      }
    }
  }
`

export default Network
