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
  fragment BodyChapter on PrismicProjectBodyChapter {
    slice_type
    primary {
      theme
      title
      show_title
    }
  }

  fragment BodySection on PrismicProjectBodySection {
    slice_type
    primary {
      title
    }
  }

  fragment BodyText on PrismicProjectBodyText {
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

  fragment BodyImage on PrismicProjectBodyImage {
    slice_type
    primary {
      layout
      margin
      theme

      caption
      image {
        alt
        fluid(maxWidth: 2000) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodyVideo on PrismicProjectBodyVideo {
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

  fragment BodyImageGallery on PrismicProjectBodyImageGallery {
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
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodyComparison on PrismicProjectBodyComparison {
    slice_type
    primary {
      layout
      margin
      theme

      caption
      image_a {
        alt
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
      image_b {
        alt
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodySlideshow on PrismicProjectBodySlideshow {
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
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodyWaterfall on PrismicProjectBodyWaterfall {
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
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodyTestimonial on PrismicProjectBodyTestimonial {
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

  fragment BodyEmbed on PrismicProjectBodyEmbed {
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

  fragment BodyHighlight on PrismicProjectBodyHighlight {
    slice_type
    primary {
      layout
      margin
      theme

      text
    }
  }

  fragment BodyStickyImage on PrismicProjectBodyStickyImage {
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
        fluid(maxWidth: 1200) {
          ...GatsbyPrismicImageFluid_noBase64
        }
      }
    }
  }

  fragment BodyStickyVideo on PrismicProjectBodyStickyVideo {
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
