import React from 'react'

import { textByLine } from 'utils/textByLine'

import * as S from './TitleAndText.style'

type Props = {
  title: string
  text: string
  maxWidth?: string
  cta?: {
    text: string
    link: string
  }
  className?: string
}

const TitleAndText: React.FC<Props> = ({
  title,
  text,
  cta,
  maxWidth = '25rem',
  className,
}) => {
  return (
    <S.Holder className={className} style={{ maxWidth }}>
      <S.Title>{title}</S.Title>
      {textByLine(text).map((line, i) => (
        <S.Text key={i}>{line}</S.Text>
      ))}
      {cta && <S.ArrowLink to={cta.link}>{cta.text}</S.ArrowLink>}
    </S.Holder>
  )
}

export default TitleAndText
