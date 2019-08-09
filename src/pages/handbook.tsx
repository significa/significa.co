import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout/'
import SEO from '../components/SEO'
import { Top, Featured, Category } from '../components/Handbook/MainPage'

interface HandbookPageProps {
  data: {
    prismic: {
      allHandbooks: {
        edges: Array<{
          node: HandbookData
        }>
      }
    }
  }
}

interface ChapterBase {
  chapter_link_text: string
  chapter_link_description: string
}

interface ChapterContentBase {
  _meta: {
    uid: string
    type: string
  }
  title: string
}

export type Chapter = ChapterBase & {
  chapter: ChapterContentBase
}

export type ChapterWithImage = ChapterBase & {
  chapter: ChapterContentBase & {
    image: {
      alt: string
      url: string
    }
    imageSharp: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

interface HandbookData {
  title: string
  description: string
  side_note: string
  featured: ChapterWithImage[]
  body: Array<{
    primary: {
      category_description: string
      category_title: string
    }
    fields: Chapter[]
  }>
}

const HandbookPage = ({ data }: HandbookPageProps) => {
  const content = data.prismic.allHandbooks.edges[0].node

  return (
    <Layout>
      <SEO title={content.title} description={content.description} />

      <Top
        title={content.title}
        description={content.description}
        sideNote={content.side_note}
      />

      <Featured featured={content.featured} />

      {content.body.map((category, i) => {
        return (
          <Category
            key={i}
            title={category.primary.category_title}
            description={category.primary.category_description}
            chapters={category.fields}
          />
        )
      })}
    </Layout>
  )
}

export default HandbookPage

export const query = graphql`
  query HandbookPage {
    prismic {
      allHandbooks {
        edges {
          node {
            title
            description
            side_note

            featured {
              chapter_link_text
              chapter_link_description
              chapter {
                ... on PRISMIC_Handbook_chapter {
                  _meta {
                    uid
                    type
                  }
                  title
                  image
                  imageSharp {
                    childImageSharp {
                      fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid_withWebp_noBase64
                      }
                    }
                  }
                }
              }
            }

            body {
              ... on PRISMIC_HandbookBodyCategory {
                primary {
                  category_description
                  category_title
                }
                fields {
                  chapter_link_text
                  chapter_link_description
                  chapter {
                    ... on PRISMIC_Handbook_chapter {
                      _meta {
                        uid
                        type
                      }
                      title
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
