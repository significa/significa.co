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
    const positions = result.data.allMarkdownRemark.edges

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
