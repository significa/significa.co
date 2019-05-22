/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

/** Creating alias in webpack config */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, 'src/theme'),
      },
      extensions: ['.ts', '.tsx'],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'ProjectsYaml') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'projects',
    })

    createNodeField({
      node,
      name: 'slug',
      value: `/showcase${slug}`,
    })
  }

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'careers',
    }).replace('/positions', '')

    createNodeField({
      node,
      name: 'slug',
      value: `/careers${slug}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: '/studio',
    toPath: '/about',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/enquiry',
    toPath: '/contact',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/work',
    toPath: '/showcase',
    isPermanent: true,
    redirectInBrowser: true,
  })

  createRedirect({
    fromPath: '/labs/css-only-slider',
    toPath: '/labs',
    isPermanent: true,
    redirectInBrowser: true,
  })

  return graphql(`
    {
      allProjectsYaml(
        sort: { fields: date, order: DESC }
        filter: { published: { ne: false } }
      ) {
        edges {
          node {
            title
            tagline
            hero {
              childImageSharp {
                fluid(maxWidth: 3000) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                  srcWebp
                  srcSetWebp
                }
              }
            }
            heroTheme
            themes {
              name
              background
              foreground
              highlight
              medium
              subtle
              error
            }
            fields {
              slug
            }
          }
        }
      }

      allMarkdownRemark(filter: { frontmatter: { position: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              position
              tagline
              company
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const projects = result.data.allProjectsYaml.edges
    const positions = result.data.allMarkdownRemark.edges

    projects.forEach(({ node }, index) => {
      const next =
        index === projects.length - 1
          ? projects[0].node
          : projects[index + 1].node

      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/project.tsx`),
        context: {
          slug: node.fields.slug,
          next,
        },
      })
    })

    positions.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/position.tsx`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
