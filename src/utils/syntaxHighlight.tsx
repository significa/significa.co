import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import graphql from 'react-syntax-highlighter/dist/esm/languages/prism/graphql'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'

import syntaxHighlightTheme from './syntaxHighlightTheme'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('graphql', graphql)
SyntaxHighlighter.registerLanguage('scss', scss)

const htmlSerializer = (type: string, element: any) => {
  if (type === 'preformatted') {
    return (
      <SyntaxHighlighter language={element.label} style={syntaxHighlightTheme}>
        {element.text}
      </SyntaxHighlighter>
    )
  }

  if (type === 'paragraph') {
    const regexExp = /(`.*?`)/gim
    const shouldCatch = regexExp.test(element.text)

    if (shouldCatch) {
      const elements = element.text.split(regexExp)
      const formatted = elements.reduce(
        (acc: React.ReactNode[], curr: string) => {
          if (regexExp.test(curr)) {
            const strCleaned = curr.replace(/`/gm, '')
            acc.push(<code>{strCleaned}</code>)
          } else {
            acc.push(curr)
          }

          return acc
        },
        []
      )

      return <p>{formatted}</p>
    }
  }

  return null
}

export default htmlSerializer
