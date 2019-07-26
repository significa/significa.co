import { graphql } from 'gatsby'

export const ProjectFragment = graphql`
  fragment ProjectImage on File {
    childImageSharp {
      fluid(maxWidth: 3000) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
      resize {
        height
      }
    }
  }

  fragment ProjectFragment on PRISMIC_Project {
    # Themes
    main_theme
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

    #SEO
    seo_title
    seo_description
    seo_og_image

    #Hero
    project_title
    tagline
    hero_image
    hero_imageSharp {
      ...ProjectImage
    }

    #Meta
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
        ... on PRISMIC__ExternalLink {
          url
        }
      }
    }

    #Next Project
    next_project {
      ... on PRISMIC_Project {
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
        _meta {
          type
          uid
        }
      }
    }

    #Project Content
    body {
      ... on PRISMIC_ProjectBodyChapter {
        type
        chapter: primary {
          show_title
          theme
          title
        }
      }
      ... on PRISMIC_ProjectBodySection {
        type
        section: primary {
          title
        }
      }
      ... on PRISMIC_ProjectBodyText {
        type
        text: primary {
          layout
          margin
          theme

          link
          link_to
          text
          title
        }
      }
      ... on PRISMIC_ProjectBodyImage {
        type
        image: primary {
          layout
          margin
          theme

          image
          imageSharp {
            ...ProjectImage
          }
          caption
        }
      }
      ... on PRISMIC_ProjectBodyVideo {
        type
        video: primary {
          layout
          margin
          theme

          autoplay
          caption
          controls
          loop
          mute
          video {
            ... on PRISMIC__FileLink {
              url
            }
          }
        }
      }
      ... on PRISMIC_ProjectBodyImage_gallery {
        type
        image_gallery: primary {
          layout
          margin
          theme

          caption
          columns
        }
        image_gallery_images: fields {
          image
          imageSharp {
            ...ProjectImage
          }
          span
          span_tablet
          span_mobile
        }
      }
      ... on PRISMIC_ProjectBodyComparison {
        type
        comparison: primary {
          layout
          margin
          theme

          caption
          image_a
          image_aSharp {
            ...ProjectImage
          }
          image_b
          image_bSharp {
            ...ProjectImage
          }
        }
      }
      ... on PRISMIC_ProjectBodySlideshow {
        type
        slideshow: primary {
          layout
          margin
          theme

          caption
        }
        slideshow_images: fields {
          image
          imageSharp {
            ...ProjectImage
          }
        }
      }
      ... on PRISMIC_ProjectBodyWaterfall {
        type
        waterfall: primary {
          layout
          margin
          theme
        }
        waterfall_images: fields {
          image
          imageSharp {
            ...ProjectImage
          }
        }
      }
      ... on PRISMIC_ProjectBodyTestimonial {
        type
        testimonial: primary {
          layout
          margin
          theme

          author
          link
          link_to
          text
        }
      }
      ... on PRISMIC_ProjectBodyEmbed {
        type
        embed: primary {
          layout
          margin
          theme

          code
        }
      }
      ... on PRISMIC_ProjectBodyHighlight {
        type
        highlight: primary {
          layout
          margin
          theme

          text
        }
      }
      ... on PRISMIC_ProjectBodySticky_image {
        type
        sticky_image: primary {
          layout
          margin
          theme

          invert
          is_sticky
          text
          title
          image
          imageSharp {
            ...ProjectImage
          }
        }
      }
      ... on PRISMIC_ProjectBodySticky_video {
        type
        sticky_video: primary {
          layout
          margin
          theme

          invert
          is_sticky
          text
          title
          video {
            ... on PRISMIC__FileLink {
              url
            }
          }
        }
      }
    }
    #End project content
  }
`
