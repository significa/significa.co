const pkg = require('./package.json')

module.exports = {
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
    'gatsby-transformer-yaml',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 100,
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
