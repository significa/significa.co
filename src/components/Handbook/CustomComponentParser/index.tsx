import React from 'react'

import * as S from './styled'
import linkResolver from '../../../utils/linkResolver'

interface CustomComponentParserProps {
  element: {
    type: string
    text: string
    spans: Array<{
      start: number
      end: number
      type: string
      data?: {
        id: string
        isBroken: boolean
        lang: string
        link_type: string
        slug: string
        type: string
        uid: string
        url?: string
      }
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
        <S.SmallText>{renderText(text)}</S.SmallText>
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
          <S.SmallText>{renderText(text)}</S.SmallText>
        </S.Box>
      )
    }

    return null
  }

  // Highlight
  if (/\[highlight/gim.test(element.text)) {
    let text = element.text
    const content = /\[highlight\]([^<]+)\[\/highlight\]/gim.exec(element.text)

    if (content && content.length > 0) {
      text = content[1]
    }

    return (
      <S.Highlight>
        <S.Text>{renderText(text)}</S.Text>
      </S.Highlight>
    )
  }

  // Link
  if (/\[link/gim.test(element.text)) {
    const content = /\[link text="([^<]+)"\]([^<]+)\[\/link\]/gim.exec(
      element.text
    )

    if (
      content &&
      content.length > 0 &&
      element.spans.length > 0 &&
      element.spans[0].data
    ) {
      const [, title, text] = content
      const link = element.spans[0].data

      return (
        <S.LinkBox>
          <S.Title>{title}</S.Title>
          {link.link_type === 'Web' || link.link_type === 'Media' ? (
            <S.ExternalLink
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.SmallText>{renderText(text)}</S.SmallText>
              <S.RightArrow />
            </S.ExternalLink>
          ) : (
            <S.Link to={linkResolver(link)}>
              <S.SmallText>{renderText(text)}</S.SmallText>
              <S.RightArrow />
            </S.Link>
          )}
        </S.LinkBox>
      )
    }

    return null
  }

  // Abbr
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
