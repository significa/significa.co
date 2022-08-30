import { graphql } from 'gatsby'

export const projectFragments = graphql`
  fragment ProjectThemes on PrismicProjectDataType {
    main_theme
    navigation_theme
    hero_theme
    themes {
      name
      background
      foreground
      highlight
      medium
      subtle
      error
    }
  }

  fragment ProjectSEO on PrismicProjectDataType {
    seo_title
    seo_description
    seo_og_image {
      url
    }
  }

  fragment ProjectHero on PrismicProjectDataType {
    project_title
    tagline
    hero_image {
      fluid(maxWidth: 3000) {
        ...GatsbyPrismicImageFluid_noBase64
      }
    }
  }

  fragment ProjectMeta on PrismicProjectDataType {
    description
    client
    services {
      service
    }
    deliverables {
      deliverable
    }
    links {
      link_text
      link {
        url
      }
    }
  }

  fragment NextProject on PrismicProjectDataType {
    next_project {
      document {
        ... on PrismicProject {
          url
          data {
            hero_theme
            themes {
              name
              background
              foreground
              highlight
              medium
              subtle
              error
            }
            project_title
            tagline
          }
        }
      }
    }
  }
`

export const sectionsFragments = graphql`
  fragment BodyChapter on PrismicProjectDataBodyChapter {
    slice_type
    primary {
      theme
      title
      show_title
    }
  }

  fragment BodySection on PrismicProjectDataBodySection {
    slice_type
    primary {
      title
    }
  }

  fragment BodyText on PrismicProjectDataBodyText {
    slice_type
    primary {
      theme
      margin
      layout
      title
      text
      link_to
      link
    }
  }

  fragment BodyImage on PrismicProjectDataBodyImage {
    slice_type
    primary {
      layout
      margin
      theme

      caption
      image {
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodyVideo on PrismicProjectDataBodyVideo {
    slice_type
    primary {
      layout
      margin
      theme

      autoplay
      caption
      controls
      loop
      mute

      video {
        url
      }
    }
  }

  fragment BodyImageGallery on PrismicProjectDataBodyImageGallery {
    slice_type
    primary {
      layout
      margin
      theme

      caption
      columns
    }
    items {
      span
      span_tablet
      span_mobile
      image {
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodyComparison on PrismicProjectDataBodyComparison {
    slice_type
    primary {
      layout
      margin
      theme

      caption
      image_a {
        alt
        gatsbyImageData
      }
      image_b {
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodySlideshow on PrismicProjectDataBodySlideshow {
    slice_type
    primary {
      layout
      margin
      theme

      caption
    }
    items {
      image {
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodyWaterfall on PrismicProjectDataBodyWaterfall {
    slice_type
    primary {
      layout
      margin
      theme
    }
    items {
      image {
        dimensions {
          height
        }
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodyTestimonial on PrismicProjectDataBodyTestimonial {
    slice_type
    primary {
      layout
      margin
      theme

      author
      link
      link_to
      text
    }
  }

  fragment BodyEmbed on PrismicProjectDataBodyEmbed {
    slice_type
    primary {
      layout
      margin
      theme

      code {
        html
      }
    }
  }

  fragment BodyHighlight on PrismicProjectDataBodyHighlight {
    slice_type
    primary {
      layout
      margin
      theme

      text
    }
  }

  fragment BodyStickyImage on PrismicProjectDataBodyStickyImage {
    slice_type
    primary {
      layout
      margin
      theme

      invert
      is_sticky
      text
      title
      image {
        alt
        gatsbyImageData
      }
    }
  }

  fragment BodyStickyVideo on PrismicProjectDataBodyStickyVideo {
    slice_type
    primary {
      layout
      margin
      theme

      invert
      is_sticky
      text
      title
      video {
        url
      }
    }
  }
`
