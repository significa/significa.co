/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

/**
 * If we need to prevent the common elements (e.g. Header, Footer) from
 * being re-rendered in any path, wrap each page with the layout
 */

import * as React from 'react'
import { Provider } from './src/components/Header'
import {
  PrismicPreviewProvider,
} from 'gatsby-plugin-prismic-previews'

import { linkResolver } from './src/utils/linkResolver'

export const wrapRootElement = ({ element, props }) => (
  <PrismicPreviewProvider
    repositoryConfigs={[
      {
        repositoryName: 'significa',
        linkResolver,
      },
    ]}
  >
    <Provider {...props}>
    {element}
    </Provider>
  </PrismicPreviewProvider>
)