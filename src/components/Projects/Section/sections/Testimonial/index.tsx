import React from 'react'

import { ArrowLink, Link, Text, Title } from 'components/UI'
import { textByLine } from 'utils/textByLine'

import { TestimonialType } from '../../types'
import * as S from './styled'

const Testimonial = ({
  primary: { author, link, link_to, text },
}: TestimonialType) => {
  return (
    <S.Wrapper>
      <S.Quote />
      {textByLine(text).map((line, i) => (
        <Title as="p" key={i}>
          {line}
        </Title>
      ))}
      <S.Meta>
        <Text>{author}</Text>
        {link &&
          link_to &&
          (/^\/(?!\/)/.test(link_to) ? (
            <ArrowLink highlight to={link_to}>
              {link}
            </ArrowLink>
          ) : (
            <Link to={link_to}>{link}</Link>
          ))}
      </S.Meta>
    </S.Wrapper>
  )
}

export default Testimonial
