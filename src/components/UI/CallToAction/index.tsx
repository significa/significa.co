import React from 'react'

import { ArrowLink } from '../'
import * as S from './styled'

interface ICallToAction {
  title: string
  text: string
  link: string
  linkText: string
}

const CallToAction: React.FC<ICallToAction> = ({
  title,
  text,
  link,
  linkText,
}) => {
  return (
    <S.CallToActionWrapper>
      <S.Display>{title}</S.Display>
      <S.Big>{text}</S.Big>
      <ArrowLink highlight to={link}>
        {linkText}
      </ArrowLink>
    </S.CallToActionWrapper>
  )
}

export default CallToAction
