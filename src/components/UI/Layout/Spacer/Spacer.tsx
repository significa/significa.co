import React from 'react'

import * as S from './Spacer.styled'

type Measurement = string | number
type SpaceType = 'small' | 'medium' | 'large'
type Space = [Measurement, Measurement, Measurement] // [desktop, tablet, mobile]
export type Spacing = { top: Space; bottom: Space }
type Props = {
  variant?: SpaceType
  spacing?: Partial<Spacing>
}

const Spacer: React.FC<Props> = ({
  variant = 'medium',
  spacing = {},
  children,
}) => {
  const defaultSpacings: { [key in SpaceType]: Spacing } = {
    small: {
      top: ['7em', '5em', '3em'],
      bottom: ['7em', '5em', '3em'],
    },
    medium: {
      top: ['10em', '7em', '5em'],
      bottom: ['10em', '7em', '5em'],
    },
    large: {
      top: ['12em', '8em', '6.5em'],
      bottom: ['12em', '8em', '6.5em'],
    },
  }
  const mergedSpacing = defaultSpacings[variant]

  if (spacing.top) {
    mergedSpacing.top = spacing.top
  }

  if (spacing.bottom) {
    mergedSpacing.bottom = spacing.bottom
  }

  return <S.Wrapper spacing={mergedSpacing}>{children}</S.Wrapper>
}

export default Spacer
