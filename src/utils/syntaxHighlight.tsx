import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql'

import syntaxHighlightTheme from './syntaxHighlightTheme'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('graphql', graphql)

const htmlSerializer = (type: string, element: any) => {
  if (type === 'preformatted') {
    return (
      <SyntaxHighlighter language={element.label} style={syntaxHighlightTheme}>
        {element.text}
      </SyntaxHighlighter>
    )
  }

  return null
}

export default htmlSerializer
