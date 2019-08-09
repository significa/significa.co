import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { RichText } from 'prismic-reactjs'

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
    _meta?: {
      uid: string
      type: string
    }
  }
}

export interface Chapter {
  title: string
  description: string
  image: {
    alt: string
  }
  imageSharp: {
    childImageSharp: {
      fluid: FluidObject
      resize: {
        height: number
      }
    }
  }
  body: Array<{
    content?: {
      content: any
    }
    testimonial?: Testimonial
  }>
}

export interface NavigationChapter {
  chapter: {
    _meta: {
      uid: string
      type: string
    }
    title: string
    image: {
      alt: string
      url: string
    }
  }
}

interface HandbookChapterPageProps {
  data: {
    prismic: {
      handbook_chapter: Chapter
      allHandbooks: {
        edges: Array<{
          node: {
            featured: NavigationChapter[]
            body: Array<{
              fields: NavigationChapter[]
            }>
          }
        }>
      }
    }
  }
  pageContext: {
    uid: string
  }
}

const HandbookChapterPage: React.FC<HandbookChapterPageProps> = ({
  data: {
    prismic: { handbook_chapter: chapter, allHandbooks },
  },
  pageContext: { uid },
}) => {
  if (!chapter) {
    return null
  }

  let prevChapter
  let nextChapter
  // Featured chapters
  const allChapters = allHandbooks.edges[0].node.featured
  // Add all chapters from each group
  allHandbooks.edges[0].node.body.forEach(group => {
    allChapters.push(...group.fields)
  })

  const currIndex = [...allChapters].findIndex(c => c.chapter._meta.uid === uid)
  if (currIndex > 0) {
    prevChapter = allChapters[currIndex - 1]
  }

  if (currIndex < allChapters.length - 1) {
    nextChapter = allChapters[currIndex + 1]
  }

  return (
    <HandbookLayout currentPage={uid}>
      <SEO title={chapter.title} description={chapter.description} />

      <Cover chapter={chapter} />
      {chapter.body.map((chunk, i) => {
        if (chunk.content) {
          return (
            <Content key={i}>
              <RichText
                render={chunk.content.content}
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
                    const shouldCatch = /\[side-note|\[abbr|\[box|\[highlight|\[link|/gim.test(
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

        if (chunk.testimonial) {
          return <Testimonial key={i} testimonial={chunk.testimonial} />
        }

        return null
      })}

      <BottomNavigation prevChapter={prevChapter} nextChapter={nextChapter} />
    </HandbookLayout>
  )
}

export default HandbookChapterPage

export const query = graphql`
  query HandbookChapter($uid: String!, $lang: String!) {
    prismic {
      handbook_chapter(lang: $lang, uid: $uid) {
        title
        description
        image
        imageSharp {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
        body {
          ... on PRISMIC_Handbook_chapterBodyContent {
            content: primary {
              content
            }
          }
          ... on PRISMIC_Handbook_chapterBodyTestimonial {
            testimonial: primary {
              name
              position
              background_color
              photo
              logo
              quote
              link_text
              link {
                ... on PRISMIC_Project {
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
          }
        }
      }

      allHandbooks {
        edges {
          node {
            featured {
              chapter {
                ... on PRISMIC_Handbook_chapter {
                  title
                  image
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
            body {
              ... on PRISMIC_HandbookBodyCategory {
                fields {
                  chapter {
                    ... on PRISMIC_Handbook_chapter {
                      title
                      image
                      _meta {
                        uid
                        type
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
