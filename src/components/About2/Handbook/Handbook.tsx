import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { Featured } from 'components/Handbook/MainPage'
import { RightContent, Spacer } from 'components/UI'
import { ChapterWithImage } from 'pages/handbook'
import { textByLine } from 'utils/textByLine'

import * as S from './Handbook.style'

type Data = {
  aboutYaml: {
    handbook: {
      title: string
      text: string
      cta: string
    }
  }
  prismicHandbook: {
    data: {
      featured: ChapterWithImage[]
    }
  }
}

const AboutHandbook = () => {
  const {
    aboutYaml: { handbook: content },
    prismicHandbook: { data },
  } = useStaticQuery<Data>(query)

  return (
    <>
      <RightContent title={content.title} gridTemplate={['1fr 1fr', '1fr']}>
        {textByLine(content.text).map((line, i) => (
          <S.Text key={i}>{line}</S.Text>
        ))}
        <S.Link to="/handbook">{content.cta}</S.Link>
      </RightContent>
      <Spacer variant="xsmall" spacing={{ bottom: [0, 0, 0] }}>
        <Featured featured={data.featured} />
      </Spacer>
    </>
  )
}

export default AboutHandbook

const query = graphql`
  query AboutHandbookFeatured {
    aboutYaml {
      handbook {
        title
        text
        cta
      }
    }
    prismicHandbook {
      data {
        featured {
          chapter_link_text
          chapter_link_description

          chapter {
            url
            document {
              ... on PrismicHandbookChapter {
                data {
                  title
                  image {
                    alt
                    url
                    fluid(maxWidth: 600) {
                      ...GatsbyPrismicImageFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
