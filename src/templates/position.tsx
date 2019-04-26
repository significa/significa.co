import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { FormPosition } from '../components/Careers'
import { ColetivSmall, AdamantSmall, Big } from '../components/UI'

import * as S from './position.styled'

type CompanyType = 'coletiv' | 'adamant'
type AllCompaniesType = CompanyType | 'significa'

interface ITemplate {
  data: {
    markdownRemark: {
      frontmatter: { position: string; company: AllCompaniesType }
      html: string
    }
  }
}

const renderCompany = (company: CompanyType) => {
  const logoComponents: { [K in CompanyType]: React.FC<any> } = {
    coletiv: ColetivSmall,
    adamant: AdamantSmall,
  }

  const ImageComponent = logoComponents[company]

  return <ImageComponent />
}

const PositionTemplate: React.FC<ITemplate> = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { position, company },
    },
  },
}) => {
  return (
    <Layout footerTheme="dark">
      <SEO title={position} />
      <S.Wrapper>
        <S.TitleWrapper>
          <Big>{position}</Big>
          {company && company !== 'significa' && renderCompany(company)}
        </S.TitleWrapper>
        <S.Content dangerouslySetInnerHTML={{ __html: html }} />
      </S.Wrapper>
      <FormPosition position={position} />
    </Layout>
  )
}

export default PositionTemplate

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        position
        company
      }
      html
    }
  }
`
