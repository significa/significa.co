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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  /**
   * Redirects
   */
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

  /** Positions */
  const positions = await graphql(`
    {
      allPrismicPosition {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)
  positions.data.allPrismicPosition.edges.forEach(({ node }) => {
    createPage({
      path: `/careers/${node.uid}`,
      component: path.resolve(`./src/templates/position.tsx`),
      context: {
        uid: node.uid,
      },
    })
  })

  /**
   * Blog
   */

  // Posts
  const posts = await graphql(`
    {
      allPrismicBlogPost {
        edges {
          node {
            uid
            data {
              category
            }
          }
        }
      }
    }
  `)
  posts.data.allPrismicBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.uid}`,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        uid: node.uid,
      },
    })
  })

  // categories
  posts.data.allPrismicBlogPost.edges.forEach(({ node }) => {
    const slugifyCategory = slugify(node.data.category)
    createPage({
      path: `/blog/category/${slugifyCategory}`,
      component: path.resolve(`./src/templates/blog-category.tsx`),
      context: {
        category: node.data.category,
      },
    })
  })

  // Authors
  // TODO: uncomment when templates/blog-author.tsx is ready

  // const authors = await graphql(`
  //   {
  //     allPrismicBlogAuthor {
  //       edges {
  //         node {
  //           uid
  //         }
  //       }
  //     }
  //   }
  // `)
  // authors.data.allPrismicBlogAuthor.edges.forEach(({ node }) => {
  //   createPage({
  //     path: `/blog/author/${node.uid}`,
  //     component: path.resolve(`./src/templates/blog-author.tsx`),
  //     context: {
  //       uid: node.uid,
  //     },
  //   })
  // })
}
