import React from 'react'

import { ITestimonial } from '../../types'
import { textByLine } from '../../../../../utils/textByLine'

import { Title, Text, ArrowLink } from '../../../../UI'

import * as S from './styled'

const Testimonial = (props: ITestimonial) => {
  return (
    <S.Wrapper>
      <S.Quote />
      {textByLine(props.text).map((line, i) => (
        <Title as="p" key={i}>
          {line}
        </Title>
      ))}
      <S.Meta>
        <Text>{props.author}</Text>
        {props.link && (
          <ArrowLink to={props.link.url}>{props.link.text}</ArrowLink>
        )}
      </S.Meta>
    </S.Wrapper>
  )
}

export default Testimonial
