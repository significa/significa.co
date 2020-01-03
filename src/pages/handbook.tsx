import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout/'
import SEO from '../components/SEO'
import { Top, Featured, Category } from '../components/Handbook/MainPage'

interface HandbookPageProps {
  data: {
    allPrismicHandbook: {
      nodes: Array<{
        data: HandbookData
      }>
    }
  }
}

interface ChapterBase {
  chapter_link_text: string
  chapter_link_description: string
}

export type Chapter = ChapterBase & {
  chapter: {
    url: string
    document: {
      data: {
        title: string
      }
    }
  }
}

export type ChapterWithImage = ChapterBase & {
  chapter: {
    url: string
    document: {
      data: {
        title: string
        image: {
          alt: string
          url: string
          fluid: FluidObject
        }
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
    items: Chapter[]
  }>
}

const HandbookPage = ({ data }: HandbookPageProps) => {
  const content = data.allPrismicHandbook.nodes[0].data

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
            chapters={category.items}
          />
        )
      })}
    </Layout>
  )
}

export default HandbookPage

export const query = graphql`
  query HandbookPage {
    allPrismicHandbook {
      nodes {
        data {
          title
          description
          side_note

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
          body {
            ... on PrismicHandbookBodyCategory {
              primary {
                category_title
                category_description
              }
              items {
                chapter_link_text
                chapter_link_description

                chapter {
                  url
                  document {
                    ... on PrismicHandbookChapter {
                      data {
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
  }
`
