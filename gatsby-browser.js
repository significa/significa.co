/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/**
 * If we need to prevent the common elements (e.g. Header, Footer) from
 * being re-rendered in any path, wrap each page with the layout
 */

import React from 'react'
import { Provider } from './src/components/Header'

export const wrapPageElement = ({ element, props }) => {
  return <Provider {...props}>{element}</Provider>
}

// export const onRouteUpdate = ({ location: { hash } }) => {
//   if (hash) {
//     window.setTimeout(() => {
//       const el = document.querySelector(hash)
//       if (el) return window.scrollTo(0, el.offsetTop)
//       return false
//     })
//   }
// }

const { registerLinkResolver } = require('gatsby-source-prismic-graphql')
const { linkResolver } = require('./src/utils/linkResolver')

registerLinkResolver(linkResolver)
