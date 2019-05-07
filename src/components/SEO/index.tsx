import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import sourceImageShare from '../../assets/images/share.png'

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
}

const SEO: React.FC<ISEOProps> = ({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  image,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const currentTitle = title || site.siteMetadata.title
  const titleTemplate = title
    ? `%s | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const imageShare = image || sourceImageShare

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={currentTitle}
      titleTemplate={titleTemplate}
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
          content: imageShare,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: imageShare,
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
