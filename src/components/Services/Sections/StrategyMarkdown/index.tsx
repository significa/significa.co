import React from 'react'

import Arrows from './Arrows'

import * as S from './styled'

interface IStrategyMarkdownProps {
  title: string
  text: string
}

const StrategyMarkdown: React.FC<IStrategyMarkdownProps> = ({
  title,
  text,
}) => {
  return (
    <S.Wrapper>
      <S.TextContent>
        <S.Text>#{title}#</S.Text>
        <br />
        <S.Text>{text}</S.Text>
      </S.TextContent>
      <S.Bottom>
        <S.BottomButton isHighlighted>Body</S.BottomButton>
        <S.BottomButton>
          Heading 1<Arrows />
        </S.BottomButton>
        <S.BottomButton>
          List
          <Arrows />
        </S.BottomButton>
        <S.BottomButton>Quote</S.BottomButton>

        <S.Divider />

        <S.BottomButton>Italic</S.BottomButton>
        <S.BottomButton>Bold</S.BottomButton>
        <S.BottomButton>Strikethrough</S.BottomButton>
      </S.Bottom>
    </S.Wrapper>
  )
}

export default StrategyMarkdown
