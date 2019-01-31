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
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allProjectsYaml(sort: { fields: date }) {
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
    }
  `).then(result => {
    const projects = result.data.allProjectsYaml.edges

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
  })
}
