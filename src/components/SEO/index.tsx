import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

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
    opengraph: opengraphImage,
  } = allImageSharp.edges.reduce((prev: {}, { node }: INodeImage) => {
    const name = node.resize.originalName.replace('.png', '')
    const value = node.original.src

    return { ...prev, [name]: value }
  }, {})

  const { siteUrl } = site.siteMetadata
  const metaDescription = description || site.siteMetadata.description
  const currentTitle = title || site.siteMetadata.title
  const defaultTitleTemplate = title
    ? `${site.siteMetadata.title} %s`
    : site.siteMetadata.title

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
          content: `${siteUrl}${image || opengraphImage}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: `${siteUrl}${image || twittercardImage}`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
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
        { rel: 'dns-prefetch', href: 'https://marketingplatform.google.com' },
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
}

export default SEO
