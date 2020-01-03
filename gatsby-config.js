/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')
const linkResolver = require('./src/utils/linkResolver')

require('dotenv').config()

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: pkg.title,
    description: pkg.description,
    author: '@significadesign',
    keywords: pkg.keywords,
    siteUrl: pkg.siteUrl,
  },
  plugins: [
    // SEO things
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: pkg.siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-67282841-1',
        anonymize: true,
        respectDNT: true,
      },
    },
    // End SEO
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'significa',
        defaultLang: 'en-gb',
        previews: false,
        sharpKeys: [/image|photo|picture|hero|profile_pic/],
        pages: [
          {
            type: 'Project',
            match: '/showcase/:uid',
            path: '/project-preview',
            component: require.resolve('./src/templates/project.tsx'),
          },
          // {
          //   type: 'Position',
          //   match: '/careers/:uid',
          //   path: '/position-preview',
          //   component: require.resolve('./src/templates/position.tsx'),
          // },
          {
            type: 'Handbook_chapter',
            match: '/handbook/:uid',
            path: '/handbook-preview',
            component: require.resolve('./src/templates/handbook.tsx'),
          },
          // {
          //   type: 'Blog_post',
          //   match: '/blog/:uid',
          //   path: '/blog-post-preview',
          //   component: require.resolve('./src/templates/blog-post.tsx'),
          // },
          // {
          //   type: 'Blog_author',
          //   match: '/blog/author/:uid',
          //   path: '/blog-author-preview',
          //   component: require.resolve('./src/templates/blog-author.tsx'),
          // },
        ],
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'significa',
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        linkResolver: () => linkResolver,
        schemas: {
          blog_author: require('./schemas/blog_author.json'),
          blog_post: require('./schemas/blog_post.json'),
          handbook_chapter: require('./schemas/handbook_chapter.json'),
          handbook: require('./schemas/handbook.json'),
          lab_entry: require('./schemas/lab_entry.json'),
          position: require('./schemas/position.json'),
          project: require('./schemas/project.json'),
        },
        lang: '*',
        shouldDownloadImage: () => {
          return true
        },
      },
    },
    'gatsby-transformer-yaml',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: process.env.NODE_ENV === 'production',
        stripMetadata: true,
        defaultQuality: process.env.NODE_ENV === 'production' ? 100 : 50,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#0154FF',
        theme_color: '#0154FF',
        display: 'minimal-ui',
        icon: 'src/assets/images/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: `significa.co`,
        region: `eu-west-1`,
        protocol: `https`,
        hostname: `significa.co`,
      },
    },
  ],
}
