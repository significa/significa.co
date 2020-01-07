import React, { useEffect } from 'react'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import { usePrismicPreview } from 'gatsby-source-prismic'
import { Location } from '@reach/router'
import Helmet from 'react-helmet'
import { Provider, lightTheme } from '@theme'

import linkResolver from '../utils/linkResolver'

import { Segg, Text } from '../components/UI'

import PositionPage from '../templates/position'
import ProjectPage from '../templates/project'
import BlogPostPage from '../templates/blog-post'
import HandbookPage from '../templates/handbook'

declare global {
  interface Window {
    __PRISMIC_PREVIEW__: any
  }
}

const UNPUBLISHED_ROUTE = '/unpublishedPreview'

const PreviewPage: React.FC<{ location: Location }> = ({ location }) => {
  const [data, setData] = React.useState<any>(null)

  const { allSitePage } = useStaticQuery(
    graphql`
      {
        allSitePage {
          nodes {
            path
          }
        }
      }
    `
  )
  const allPagePaths = allSitePage.nodes.map(
    ({ path }: { path: string }) => path
  )

  const pathResolver = () => (doc: any) => {
    const url = linkResolver(doc)

    if (allPagePaths.indexOf(url) >= 0) {
      return url
    } else {
      return UNPUBLISHED_ROUTE
    }
  }

  const { previewData, path } = usePrismicPreview(location, {
    repositoryName: 'significa',
    pathResolver,
  })

  useEffect(() => {
    if (previewData && path) {
      if (path === UNPUBLISHED_ROUTE) {
        setData(previewData)
      } else {
        window.__PRISMIC_PREVIEW__ = previewData
        navigate(path)
      }
    }
  }, [previewData, path])

  if (data) {
    if ('prismicPosition' in data) {
      return <PositionPage data={data} />
    }

    if ('prismicProject' in data) {
      return <ProjectPage data={data} />
    }

    if ('prismicBlogPost' in data) {
      return <BlogPostPage data={data} />
    }

    if ('prismicHandbookChapter' in data) {
      return (
        <HandbookPage
          data={{
            ...data,
            allPrismicHandbook: {
              nodes: [{ data: { featured: [], body: [] } }],
            },
          }}
          pageContext={{ uid: data.prismicHandbookChapter.uid }}
        />
      )
    }

    throw new Error(
      'Unexpected data type received. If you have new Prismic schema types please add them in pages/preview.tsx'
    )
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Provider theme={lightTheme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Segg />
          <Text style={{ marginTop: '1em' }}>Hold on</Text>
        </div>
      </Provider>
    </>
  )
}

export default PreviewPage
