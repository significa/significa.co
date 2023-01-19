import React from 'react'
import { Provider } from './src/components/Header'
import {
  PrismicPreviewProvider,
} from 'gatsby-plugin-prismic-previews'

import { linkResolver } from './src/utils/linkResolver'

const CRISP_ID = '1d94ab70-6906-4198-a006-16144d4c8065'

const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  const scriptInnerHTML =
    `window.$crisp=[];window.CRISP_WEBSITE_ID="${CRISP_ID}";` +
    `(function(){d=document;s=d.createElement("script");` +
    `s.src="https://client.crisp.chat/l.js";` +
    `s.async=1;` +
    `d.getElementsByTagName("head")[0].appendChild(s);})();`

  return setHeadComponents([
    <script
      key="crisp-chat"
      dangerouslySetInnerHTML={{ __html: scriptInnerHTML }}
    />,
  ])
}

const wrapRootElement = ({ element, props }) => (
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

export { onRenderBody, wrapRootElement }
