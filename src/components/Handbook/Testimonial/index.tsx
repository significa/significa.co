import React from 'react'

import linkResolver from '../../../utils/linkResolver'
import { Testimonial as TestimonialType } from '../../../templates/handbook'

import * as S from './styled'

const Testimonial: React.FC<{ testimonial: TestimonialType }> = ({
  testimonial,
}) => {
  return (
    <S.Wrapper backgroundColor={testimonial.background_color}>
      <S.Left>
        <S.Info>
          <S.PhotoHolder>
            <S.Photo src={testimonial.photo.url} alt={testimonial.photo.alt} />
            <S.Logo src={testimonial.logo.url} alt={testimonial.logo.alt} />
          </S.PhotoHolder>
          <div>
            <S.Name>{testimonial.name}</S.Name>
            <S.Position>{testimonial.position}</S.Position>
          </div>
        </S.Info>
        {testimonial.link._meta && (
          <S.Link to={linkResolver(testimonial.link._meta)}>
            {testimonial.link_text}
          </S.Link>
        )}
      </S.Left>
      <S.Quote>{testimonial.quote}</S.Quote>
    </S.Wrapper>
  )
}

export default Testimonial
