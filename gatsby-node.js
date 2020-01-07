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

  /**
   * Projects
   */
  const projects = await graphql(`
    {
      allPrismicProject {
        nodes {
          uid
        }
      }
    }
  `)
  projects.data.allPrismicProject.nodes.forEach(({ uid }) => {
    createPage({
      path: `/showcase/${uid}`,
      component: path.resolve('./src/templates/project.tsx'),
      context: { uid },
    })
  })

  /**
   * Handbook
   */
  const chapters = await graphql(`
    {
      allPrismicHandbookChapter {
        nodes {
          uid
        }
      }
    }
  `)
  chapters.data.allPrismicHandbookChapter.nodes.forEach(({ uid }) => {
    createPage({
      path: `/handbook/${uid}`,
      component: path.resolve(`./src/templates/handbook.tsx`),
      context: { uid },
    })
  })

  /**
   * Positions
   */
  const positions = await graphql(`
    {
      allPrismicPosition {
        nodes {
          uid
        }
      }
    }
  `)
  positions.data.allPrismicPosition.nodes.forEach(({ uid }) => {
    createPage({
      path: `/careers/${uid}`,
      component: path.resolve(`./src/templates/position.tsx`),
      context: { uid },
    })
  })

  /**
   * Blog
   */

  // Posts
  const posts = await graphql(`
    {
      allPrismicBlogPost {
        nodes {
          uid
          data {
            category
          }
        }
      }
    }
  `)
  posts.data.allPrismicBlogPost.nodes.forEach(({ uid }) => {
    createPage({
      path: `/blog/${uid}`,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: { uid },
    })
  })

  // categories
  posts.data.allPrismicBlogPost.nodes.forEach(({ data: { category } }) => {
    const slugifyCategory = slugify(category)
    createPage({
      path: `/blog/category/${slugifyCategory}`,
      component: path.resolve(`./src/templates/blog-category.tsx`),
      context: { category },
    })
  })

  // Authors
  // TODO: uncomment when templates/blog-author.tsx is ready

  // const authors = await graphql(`
  //   {
  //     allPrismicBlogAuthor {
  //       nodes {
  //         uid
  //       }
  //     }
  //   }
  // `)
  // authors.data.allPrismicBlogAuthor.nodes.forEach(({ uid }) => {
  //   createPage({
  //     path: `/blog/author/${uid}`,
  //     component: path.resolve(`./src/templates/blog-author.tsx`),
  //     context: { uid },
  //   })
  // })
}
