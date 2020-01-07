import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

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
  // primary only exists if __typename is PrismicHandbookChapterBodyContent
  primary: {
    content: {
      raw: ContentType[]
    }
  }
}>

interface Chapter {
  chapter: {
    document: {
      uid: string
      url: string
      data: {
        title: string
        body: Body
      }
    }
  }
}

interface Content {
  featured: Chapter[]
  body: Array<{
    primary: {
      category_title: string
      category_description: string
    }
    items: Chapter[]
  }>
}

interface Data {
  allPrismicHandbook: {
    nodes: Array<{ data: Content }>
  }
}

const flatChapterHeadings = (body: Body) => {
  return body.reduce((acc: ContentType[], b) => {
    if (b.__typename === 'PrismicHandbookChapterBodyContent') {
      const justHeadings = b.primary.content.raw.filter(
        c => c.type === 'heading2' || c.type === 'heading3'
      )
      acc.push(...justHeadings)
    }

    return acc
  }, [])
}

const Navigation: React.FC<{ currentPage?: string }> = ({ currentPage }) => {
  const data: Data = useStaticQuery(query)
  const { body: categories, featured } = data.allPrismicHandbook.nodes[0].data

  const mapChapters = ({ chapter }: Chapter) => {
    const headings = flatChapterHeadings(chapter.document.data.body)

    return (
      <li key={chapter.document.uid}>
        <S.MainLink to={chapter.document.url}>
          <S.AnimatedArrowHolder
            variants={{
              open: {
                transform: `rotate(90deg)`,
              },
              closed: {
                transform: `rotate(0deg)`,
              },
            }}
            animate={currentPage === chapter.document.uid ? 'open' : 'closed'}
          >
            <Arrow />
          </S.AnimatedArrowHolder>
          {chapter.document.data.title}
        </S.MainLink>
        {headings.length > 0 && (
          <SubMenu
            path={chapter.document.url}
            headings={headings}
            isActive={currentPage === chapter.document.uid}
          />
        )}
      </li>
    )
  }

  return (
    <S.Wrapper>
      <ul>
        <li>
          <S.MainLink to={'/handbook'}>Handbook</S.MainLink>
        </li>
      </ul>
      {featured.length > 0 && <ul>{featured.map(mapChapters)}</ul>}
      {categories.map(({ primary: category, items: chapters }, i) => {
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
  fragment NavigationChapter on PrismicLinkType {
    document {
      ... on PrismicHandbookChapter {
        uid
        url
        data {
          title
          body {
            __typename
            ... on PrismicHandbookChapterBodyContent {
              primary {
                content {
                  raw
                }
              }
            }
          }
        }
      }
    }
  }

  query HandbookNavigation {
    allPrismicHandbook {
      nodes {
        data {
          featured {
            chapter {
              ...NavigationChapter
            }
          }
          body {
            ... on PrismicHandbookBodyCategory {
              primary {
                category_title
                category_description
              }
              items {
                chapter {
                  ...NavigationChapter
                }
              }
            }
          }
        }
      }
    }
  }
`
