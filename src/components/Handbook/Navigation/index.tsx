import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import linkResolver from '../../../utils/linkResolver'

import * as S from './styled'

import Arrow from './Arrow'
import SubMenu from './SubMenu'

export interface ContentType {
  type: string
  // text is guaranteed on headings (which we are filtering for)
  text: string
}

type Body = Array<{
  __typename: string
  // primary only exists if __typename is PRISMIC_Handbook_chapterBodyContent
  primary: {
    content: ContentType[]
  }
}>

interface Chapter {
  chapter: {
    _meta: {
      type: string
      uid: string
    }
    title: string
    body: Body
  }
}

interface Content {
  featured: Chapter[]
  body: Array<{
    primary: {
      category_title: string
      category_description: string
    }
    fields: Chapter[]
  }>
}

interface Data {
  prismic: {
    allHandbooks: {
      edges: Array<{ node: Content }>
    }
  }
}

const flatChapterHeadings = (body: Body) => {
  return body.reduce((acc: ContentType[], b) => {
    if (b.__typename === 'PRISMIC_Handbook_chapterBodyContent') {
      const justHeadings = b.primary.content.filter(
        c => c.type === 'heading2' || c.type === 'heading3'
      )
      acc.push(...justHeadings)
    }

    return acc
  }, [])
}

const Navigation: React.FC<{ currentPage?: string }> = ({ currentPage }) => {
  const data: Data = useStaticQuery(query)
  const { body: categories, featured } = data.prismic.allHandbooks.edges[0].node

  const mapChapters = ({ chapter }: Chapter) => {
    const headings = flatChapterHeadings(chapter.body)

    return (
      <li key={chapter._meta.uid}>
        <S.MainLink to={linkResolver(chapter._meta)}>
          <S.AnimatedArrowHolder
            variants={{
              open: {
                transform: `rotate(90deg)`,
              },
              closed: {
                transform: `rotate(0deg)`,
              },
            }}
            animate={currentPage === chapter._meta.uid ? 'open' : 'closed'}
          >
            <Arrow />
          </S.AnimatedArrowHolder>
          {chapter.title}
        </S.MainLink>
        {headings.length > 0 && (
          <SubMenu
            path={linkResolver(chapter._meta)}
            headings={headings}
            isActive={currentPage === chapter._meta.uid}
          />
        )}
      </li>
    )
  }

  return (
    <S.Wrapper>
      {featured.length > 0 && <ul>{featured.map(mapChapters)}</ul>}
      {categories.map(({ primary: category, fields: chapters }, i) => {
        return (
          <React.Fragment key={i}>
            {category.category_title && (
              <S.CategoryLabel>{category.category_title}</S.CategoryLabel>
            )}
            <ul>{chapters.map(mapChapters)}</ul>
          </React.Fragment>
        )
      })}
    </S.Wrapper>
  )
}

export default Navigation

const query = graphql`
  query HandbookNavigation {
    prismic {
      allHandbooks {
        edges {
          node {
            featured {
              chapter {
                ... on PRISMIC_Handbook_chapter {
                  title
                  _meta {
                    uid
                    type
                  }
                  body {
                    ... on PRISMIC_Handbook_chapterBodyContent {
                      label
                      primary {
                        content
                      }
                    }
                  }
                }
              }
            }
            body {
              ... on PRISMIC_HandbookBodyCategory {
                primary {
                  category_title
                  category_description
                }
                fields {
                  chapter {
                    ... on PRISMIC_Handbook_chapter {
                      title
                      _meta {
                        uid
                        type
                      }
                      body {
                        ... on PRISMIC_Handbook_chapterBodyContent {
                          label
                          primary {
                            content
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
    }
  }
`
