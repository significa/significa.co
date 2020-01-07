import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { RichText } from 'prismic-reactjs'
import { mergePrismicPreviewData } from 'gatsby-source-prismic'

import linkResolver from '../utils/linkResolver'
import { titleToID } from '../utils/titleToID'

import HandbookLayout from '../components/Layout/HandbookLayout/'
import SEO from '../components/SEO'
import {
  Content,
  Testimonial,
  Cover,
  Image,
  BottomNavigation,
  CustomComponentParser,
} from '../components/Handbook/'

export interface Testimonial {
  name: string
  position: string
  background_color: string
  photo: { url: string; alt: string }
  logo: { url: string; alt: string }
  quote: string
  link_text: string
  link: {
    url: string
  }
}

export interface Content {
  content: {
    raw: object[]
  }
}

export interface Chapter {
  title: string
  description: string
  image: {
    alt: string
    url?: string
    fluid: FluidObject
  }
  body: Array<{
    primary: Content | Testimonial
  }>
}

export interface NavigationChapter {
  chapter: {
    document: {
      url: string
      uid: string
      data: {
        title: string
        image: {
          alt: string
          url: string
        }
      }
    }
  }
}

interface HandbookChapterPageProps {
  data: {
    prismicHandbookChapter: {
      data: Chapter
    }
    allPrismicHandbook: {
      nodes: Array<{
        data: {
          featured: NavigationChapter[]
          body: Array<{
            items: NavigationChapter[]
          }>
        }
      }>
    }
  }
  pageContext: {
    uid: string
  }
}

const HandbookChapterPage: React.FC<HandbookChapterPageProps> = ({
  data: staticData,
  pageContext: { uid },
}) => {
  const preview = typeof window !== 'undefined' && window.__PRISMIC_PREVIEW__

  const data: HandbookChapterPageProps['data'] = mergePrismicPreviewData({
    staticData,
    previewData: preview,
  })

  const { prismicHandbookChapter, allPrismicHandbook } = data

  if (!prismicHandbookChapter) {
    return null
  }

  let prevChapter
  let nextChapter
  // Featured chapters
  const allChapters = allPrismicHandbook.nodes[0].data.featured
  // Add all chapters from each group
  allPrismicHandbook.nodes[0].data.body.forEach(group => {
    allChapters.push(...group.items)
  })

  const currIndex = [...allChapters].findIndex(
    c => c.chapter.document.uid === uid
  )
  if (currIndex > 0) {
    prevChapter = allChapters[currIndex - 1]
  }

  if (currIndex < allChapters.length - 1) {
    nextChapter = allChapters[currIndex + 1]
  }

  if (currIndex === allChapters.length - 1) {
    nextChapter = undefined
  }

  return (
    <HandbookLayout currentPage={uid}>
      <SEO
        title={prismicHandbookChapter.data.title}
        description={prismicHandbookChapter.data.description}
      />

      <Cover chapter={prismicHandbookChapter.data} />
      {prismicHandbookChapter.data.body.map((chunk, i) => {
        if ('content' in chunk.primary) {
          return (
            <Content key={i}>
              <RichText
                render={chunk.primary.content.raw}
                linkResolver={linkResolver}
                htmlSerializer={(type: string, element: any) => {
                  if (type === 'heading2') {
                    return (
                      <h2
                        key={titleToID(element.text)}
                        id={titleToID(element.text)}
                      >
                        {element.text}
                      </h2>
                    )
                  }

                  if (type === 'heading3') {
                    return (
                      <h3
                        key={titleToID(element.text)}
                        id={titleToID(element.text)}
                      >
                        {element.text}
                      </h3>
                    )
                  }

                  if (type === 'image') {
                    return (
                      <Image
                        key={element.url}
                        url={element.url}
                        alt={element.alt}
                      />
                    )
                  }

                  if (type === 'paragraph') {
                    const shouldCatch = /\[side-note|\[abbr|\[box|\[highlight|\[link/gim.test(
                      element.text
                    )
                    if (shouldCatch) {
                      return (
                        <CustomComponentParser
                          key={element.text}
                          element={element}
                        />
                      )
                    }
                  }

                  return null
                }}
              />
            </Content>
          )
        }

        if ('quote' in chunk.primary) {
          return <Testimonial key={i} testimonial={chunk.primary} />
        }

        return null
      })}

      <BottomNavigation prevChapter={prevChapter} nextChapter={nextChapter} />
    </HandbookLayout>
  )
}

export default HandbookChapterPage

export const query = graphql`
  fragment ChapterHandbookTemplate on PrismicLinkType {
    document {
      ... on PrismicHandbookChapter {
        uid
        url
        data {
          title
          image {
            alt
            url
          }
        }
      }
    }
  }

  query HandbookChapter($uid: String!) {
    prismicHandbookChapter(uid: { eq: $uid }) {
      data {
        title
        description
        image {
          alt
          fluid(maxWidth: 1000) {
            ...GatsbyPrismicImageFluid_noBase64
          }
        }
        body {
          ... on PrismicHandbookChapterBodyContent {
            primary {
              content {
                raw
              }
            }
          }
          ... on PrismicHandbookChapterBodyTestimonial {
            primary {
              name
              position
              background_color
              photo {
                alt
                url
              }
              logo {
                alt
                url
              }
              quote
              link_text
              link {
                url
              }
            }
          }
        }
      }
    }

    allPrismicHandbook {
      nodes {
        data {
          featured {
            chapter {
              ...ChapterHandbookTemplate
            }
          }
          body {
            ... on PrismicHandbookBodyCategory {
              items {
                chapter {
                  ...ChapterHandbookTemplate
                }
              }
            }
          }
        }
      }
    }
  }
`
