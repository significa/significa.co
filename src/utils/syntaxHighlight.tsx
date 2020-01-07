import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import styled from 'styled-components'
import theme from 'prism-react-renderer/themes/palenight'

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

const htmlSerializer = (
  type: string,
  element: { label: Language; text: string }
) => {
  if (type === 'preformatted') {
    return (
      <Highlight
        {...defaultProps}
        code={element.text}
        language={element.label}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
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
