/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const slugify = require('@sindresorhus/slugify')

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

  /**
   * Blog
   */
  const categoryTemplate = path.resolve(`./src/templates/blog-category.tsx`)

  return graphql(`
    {
      prismic {
        allBlog_posts {
          edges {
            node {
              category
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors)
    }

    const categories = result.data.prismic.allBlog_posts.edges

    categories.forEach(post => {
      const slugifyCategory = slugify(post.node.category)

      createPage({
        path: `/blog/category/${slugifyCategory}`,
        component: categoryTemplate,
        context: {
          uid: post.node.category,
        },
      })
    })
  })
}
