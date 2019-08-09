import React from 'react'

import * as S from './styled'

interface CustomComponentParserProps {
  element: {
    type: string
    text: string
    spans: Array<{
      start: number
      end: number
      type: string
    }>
  }
}

const breakLines = (text: string) => {
  const lines = text.split('\n')

  if (lines.length === 1) {
    return lines[0]
  }

  return lines.map((line, i) => {
    return (
      <span key={i}>
        {line}
        <br />
      </span>
    )
  })
}

const renderText = (text: string) => {
  return breakLines(text.replace(/^[\r\n]+|[\r\n]+$/gim, ''))
}

const CustomComponentParser: React.FC<CustomComponentParserProps> = ({
  element,
}) => {
  // Side-note
  if (/\[side-note/gim.test(element.text)) {
    let text = element.text
    const content = /\[side-note\]([^<]+)\[\/side-note\]/gim.exec(element.text)

    if (content && content.length > 0) {
      text = content[1]
    }

    return (
      <S.SidenoteWrapper>
        <S.Title>🗒 Side Note</S.Title>
        <S.Text>{renderText(text)}</S.Text>
      </S.SidenoteWrapper>
    )
  }

  // Box
  if (/\[box/gim.test(element.text)) {
    const content = /\[box title="([^<]+)"\]([^<]+)\[\/box\]/gim.exec(
      element.text
    )

    if (content && content.length > 0) {
      const [, title, text] = content

      return (
        <S.Box>
          <S.Title>{title}</S.Title>
          <S.Text>{renderText(text)}</S.Text>
        </S.Box>
      )
    }

    return null
  }

  if (/\[abbr/gim.test(element.text)) {
    const parts: string[][][] = element.text
      .split('[abbr text="')
      .map(text => text.split('"]').map(t => t.split('[/abbr]')))

    return (
      <p>
        {parts.map((chunk, i) => {
          // abbr found
          if (chunk.length === 2) {
            /**
             * If an abbr was found, we will get an array like this:
             * [
             *   ['Tooltip content for abbr'],
             *   ['abbr text', 'remaining text']
             * ]
             */
            const [tooltipContentArray, textContentArr] = chunk
            const [abbr, rest] = textContentArr

            return (
              <React.Fragment key={i}>
                <S.Abbr>
                  <span>{abbr}</span>
                  <S.Tooltip>
                    {renderText(tooltipContentArray.toString())}
                  </S.Tooltip>
                </S.Abbr>
                {renderText(rest)}
              </React.Fragment>
            )
          }

          return (
            <React.Fragment key={i}>
              {renderText(chunk.toString())}
            </React.Fragment>
          )
        })}
      </p>
    )
  }

  return null
}

export default CustomComponentParser
