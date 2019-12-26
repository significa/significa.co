import styled, { css } from 'styled-components'
import { getColor } from '../../../utils/getColor'

const baseStyle = css`
  color: ${getColor};
  font-weight: 400;
`

export const Huge = styled.h1`
  ${baseStyle};

  font-weight: 300;

  font-size: 3em;
  line-height: 1.1666;
  letter-spacing: 0;
`

export const displayStyle = css`
  ${baseStyle};

  font-weight: 300;

  font-size: 2.5em;
  line-height: 1.2;
  letter-spacing: 0;
`

export const Display = styled.h2`
  ${displayStyle};
`

export const titleStyle = css`
  ${baseStyle};

  font-weight: 300;

  font-size: 2em;
  line-height: 1.25;
  letter-spacing: 0;
`

export const Title = styled.h3`
  ${titleStyle};
`

export const smallTitleStyle = css`
  ${baseStyle};

  font-size: 1.5em;
  line-height: 1.3;
  letter-spacing: 0;
`

export const SmallTitle = styled.h4`
  ${smallTitleStyle};
`

export const bigStyle = css`
  ${baseStyle};

  font-size: 1.25em;
  line-height: 1.4;
  letter-spacing: 0;
`

export const Big = styled.p`
  ${bigStyle}
`

export const textStyle = css`
  ${baseStyle};

  font-size: 1.125em;
  line-height: 1.5;
  letter-spacing: 0;
`

export const Text = styled.p`
  ${textStyle}
`

export const labelStyle = css`
  ${baseStyle};

  font-size: 0.875rem;
  line-height: 1.3;
  letter-spacing: 0;
`

export const Label = styled.label`
  ${labelStyle}
`

export const Small = styled.small`
  ${baseStyle};

  font-size: 0.875em;
  line-height: 1.428;
  letter-spacing: 0;
`
