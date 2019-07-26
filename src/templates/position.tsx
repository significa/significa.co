import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { FormPosition } from '../components/Careers'
import { ColetivSmall, AdamantSmall, Big, Markdown } from '../components/UI'

import * as S from './position.styled'
import linkResolver from '../utils/linkResolver'

type CompanyType = 'Coletiv' | 'Adamant'
type AllCompaniesType = CompanyType | 'Significa'

interface ITemplate {
  data: {
    prismic: {
      position: {
        company: AllCompaniesType
        text: Array<{ type: string; text: string; spans: [] }>
        title: string
      }
    }
  }
}

const renderCompany = (company: CompanyType) => {
  const logoComponents: { [K in CompanyType]: React.FC<any> } = {
    Coletiv: ColetivSmall,
    Adamant: AdamantSmall,
  }

  const ImageComponent = logoComponents[company]

  return <ImageComponent />
}

const PositionTemplate: React.FC<ITemplate> = ({
  data: {
    prismic: { position },
  },
}) => {
  return (
    <Layout footerTheme="dark">
      <SEO title={position.title} />
      <S.Wrapper>
        <S.TitleWrapper>
          <Big>{position.title}</Big>
          {position.company &&
            position.company !== 'Significa' &&
            renderCompany(position.company)}
        </S.TitleWrapper>
        <Markdown>
          <RichText render={position.text} linkResolver={linkResolver} />
        </Markdown>
      </S.Wrapper>
      <FormPosition position={position.title} />
    </Layout>
  )
}

export default PositionTemplate

export const query = graphql`
  query($uid: String!, $lang: String!) {
    prismic {
      position(lang: $lang, uid: $uid) {
        company
        text
        title
      }
    }
  }
`
