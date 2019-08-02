import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import linkResolver from '../utils/linkResolver'
import { titleToID } from '../utils/titleToID'

import HandbookLayout from '../components/Layout/HandbookLayout/'
import { Content, Testimonial } from '../components/Handbook/'

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

interface HandbookChapterPageProps {
  data: {
    prismic: {
      handbook_chapter: {
        title: string
        body: Array<{
          content?: {
            content: any
          }
          testimonial?: Testimonial
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
    prismic: { handbook_chapter: chapter },
  },
  pageContext: { uid },
}) => {
  return (
    <HandbookLayout currentPage={uid}>
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
    }
  }
`
