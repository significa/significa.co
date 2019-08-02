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
        <S.Text>{breakLines(text.replace(/^[\r\n]+|[\r\n]+$/gim, ''))}</S.Text>
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
          <S.Text>
            {breakLines(text.replace(/^[\r\n]+|[\r\n]+$/gim, ''))}
          </S.Text>
        </S.Box>
      )
    }

    return null
  }

  if (/\[abbr/gim.test(element.text)) {
    const content = /([^<]+)?\[abbr text="([^<]+)"\]([^<]+)\[\/abbr\]([^<]+)?/gim.exec(
      element.text
    )

    if (content && content.length > 0) {
      const [, before, abbr, inside, after] = content

      return (
        <p>
          {before && breakLines(before.replace(/^[\r\n]+|[\r\n]+$/gim, ''))}
          <S.Abbr>
            <span>{inside}</span>
            <S.Tooltip>{abbr}</S.Tooltip>
          </S.Abbr>
          {after && breakLines(after.replace(/^[\r\n]+|[\r\n]+$/gim, ''))}
        </p>
      )
    }
  }

  return null
}

export default CustomComponentParser
