import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/palenight'
import React from 'react'
import styled from 'styled-components'

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

const htmlSerializer = (
  type: string,
  element: {
    spans: any,
    label: Language; text: string
  }
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

  return null
}

export default htmlSerializer
