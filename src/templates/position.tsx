import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import * as S from '../components/Careers/pageStyled'
import SEO from '../components/SEO'
import { FormPosition } from '../components/Careers'
import coletivSrc from '../assets/images/coletiv.svg'

interface ITemplate {
  data: {
    markdownRemark: {
      frontmatter: { position: string; company: string }
      html: string
    }
  }
}

const PositionTemplate: React.FC<ITemplate> = ({
  data: { markdownRemark },
}) => {
  return (
    <Layout footerTheme="dark">
      <SEO title={markdownRemark.frontmatter.position} />
      <S.Wrapper>
        <S.Big>
          {markdownRemark.frontmatter.position}
          {markdownRemark.frontmatter.company === 'Coletiv' && (
            <img src={coletivSrc} alt="Coletiv" />
          )}
        </S.Big>
        <S.Content dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </S.Wrapper>
      <FormPosition position={markdownRemark.frontmatter.position} />
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
