import * as React from 'react'
import { graphql } from 'gatsby'
import { mergePrismicPreviewData } from 'gatsby-source-prismic'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { FormPosition } from '../components/Careers'
import { Big, Markdown } from '../components/UI'

import * as S from './position.styled'

interface ITemplate {
  data: {
    prismicPosition: {
      data: {
        title: string
        text: {
          html: string
        }
      }
    }
  }
}

const PositionTemplate: React.FC<ITemplate> = ({ data: staticData }) => {
  const preview = typeof window !== 'undefined' && window.__PRISMIC_PREVIEW__

  const data: ITemplate['data'] = mergePrismicPreviewData({
    staticData,
    previewData: preview,
  })

  const position = data.prismicPosition.data

  if (!position) {
    return null
  }

  return (
    <Layout footerTheme="dark">
      <SEO title={position.title} />
      <S.Wrapper>
        <S.TitleWrapper>
          <Big>{position.title}</Big>
        </S.TitleWrapper>
        <Markdown dangerouslySetInnerHTML={{ __html: position.text.html }} />
      </S.Wrapper>
      <FormPosition position={position.title} />
    </Layout>
  )
}

export default PositionTemplate

export const query = graphql`
  query($uid: String!) {
    prismicPosition(uid: { eq: $uid }) {
      data {
        text {
          html
        }
        title
      }
    }
  }
`
