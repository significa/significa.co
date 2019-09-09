import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

type MetaProps =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

interface ISEOProps {
  description?: string
  lang?: string
  meta?: MetaProps[]
  keywords?: string[]
  title?: string
  image?: string
  titleTemplate?: string
}

interface INodeImage {
  node: {
    resize: { originalName: string }
    original: { src: string }
  }
}

const SEO: React.FC<ISEOProps> = ({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  image,
  titleTemplate,
}) => {
  const { site, allImageSharp } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
        allImageSharp(
          filter: { original: { src: { regex: "/twittercard|opengraph/" } } }
        ) {
          edges {
            node {
              resize {
                originalName
              }
              original {
                src
              }
            }
          }
        }
      }
    `
  )

  const {
    twittercard: twittercardImage,
    opengraphDefault: opengraphImage,
  } = allImageSharp.edges.reduce((prev: {}, { node }: INodeImage) => {
    const name = node.resize.originalName.replace('.png', '')
    const value = node.original.src

    return { ...prev, [name]: value }
  }, {})

  const { siteUrl, author } = site.siteMetadata
  const metaDescription = description || site.siteMetadata.description
  const currentTitle = title || site.siteMetadata.title
  const defaultTitleTemplate = title
    ? `${site.siteMetadata.title} %s`
    : site.siteMetadata.title

  const ogImage = image || opengraphImage
  const twitterImage = image || twittercardImage

  return (
    <Location>
      {({ location }) => {
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={currentTitle}
            titleTemplate={titleTemplate || defaultTitleTemplate}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:url`,
                content: `${siteUrl}${location.pathname}`,
              },
              {
                property: `og:site_name`,
                content: currentTitle,
              },
              {
                property: `og:title`,
                content: currentTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:image`,
                content:
                  ogImage.indexOf('https://') === -1
                    ? `${siteUrl}${ogImage}`
                    : ogImage,
              },
              {
                name: `twitter:card`,
                content: `summary_large_image`,
              },
              {
                name: `twitter:image`,
                content:
                  twitterImage.indexOf('https://') === -1
                    ? `${siteUrl}${twitterImage}`
                    : twitterImage,
              },
              {
                name: `twitter:site`,
                content: author,
              },
              {
                name: `twitter:creator`,
                content: author,
              },
              {
                name: `twitter:title`,
                content: currentTitle,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              { rel: 'dns-prefetch', href: 'https://client.relay.crisp.chat' },
              {
                rel: 'dns-prefetch',
                href: 'https://marketingplatform.google.com',
              },
              { rel: 'dns-prefetch', href: 'https://www.google.com' },
            ]

              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    </Location>
  )
}

export default SEO
