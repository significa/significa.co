import React from 'react'

import * as S from './CallToAction.styled'
import { ArrowLink } from '../UI'
import { useStaticQuery, graphql } from 'gatsby'

interface ICallToAction {
  title?: string
  text?: string
  link?: string
  linkText?: string
}

type Data = {
  partialsYaml: {
    cta: {
      title: string
      text: string
      cta: string
      link: string
    }
  }
}

const CallToAction: React.FC<ICallToAction> = ({
  title,
  text,
  link,
  linkText,
}) => {
  const {
    partialsYaml: { cta: data },
  } = useStaticQuery<Data>(graphql`
    {
      partialsYaml {
        cta {
          title
          text
          cta
          link
        }
      }
    }
  `)

  return (
    <S.CallToActionWrapper>
      <S.Display>{title || data.title}</S.Display>
      <S.Big>{text || data.text}</S.Big>
      <ArrowLink highlight to={link || data.link}>
        {linkText || data.cta}
      </ArrowLink>
    </S.CallToActionWrapper>
  )
}

export default CallToAction
