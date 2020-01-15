import Img, { FluidObject } from 'gatsby-image'
import React from 'react'

import { Icon, Text } from 'components/UI'

import * as S from './ServicesBox.style'

type Props = {
  title: string
  link: string
  fluid: FluidObject
}

const ServicesBox: React.FC<Props> = ({ title, link, fluid }) => {
  return (
    <S.BoxLink to={link}>
      <S.Header>
        <Text>{title}</Text>
        <S.IconHolder>
          <Icon asset="arrow" />
        </S.IconHolder>
      </S.Header>
      <S.ImageHolder>
        <Img fluid={fluid} />
      </S.ImageHolder>
    </S.BoxLink>
  )
}

export default ServicesBox
