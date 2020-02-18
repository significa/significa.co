import React from 'react'

import { textByLine } from 'utils/textByLine'

import * as S from './TitleAndText.style'

type Props = {
  title?: string
  text?: string
  maxWidth?: string
  cta?: {
    text: string
    link: string
  }
  className?: string
  highlight?: boolean
}

const TitleAndText: React.FC<Props> = ({
  title,
  text,
  cta,
  maxWidth = '25rem',
  className,
  highlight,
}) => {
  return (
    <S.Holder className={className} style={{ maxWidth }}>
      {title && <S.Title>{title}</S.Title>}
      {text &&
        textByLine(text).map((line, i) => <S.Text key={i}>{line}</S.Text>)}
      {cta && (
        <S.ArrowLink highlight={highlight} to={cta.link}>
          {cta.text}
        </S.ArrowLink>
      )}
    </S.Holder>
  )
}

export default TitleAndText
