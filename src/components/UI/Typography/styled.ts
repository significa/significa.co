import styled, { css } from '@theme'
import { getColor } from '../../../utils/getColor'
import { themeGet } from '../../../utils/themeGet'

const baseStyle = css`
  color: ${getColor};
  font-weight: 400;
`

export const Huge = styled.h1`
  ${baseStyle};

  font-family: ${themeGet('fonts.serif', 'serif')};

  font-size: 3em;
  line-height: 1.1666;
  letter-spacing: 0;
`

export const Display = styled.h2`
  ${baseStyle};

  font-family: ${themeGet('fonts.serif', 'serif')};

  font-size: 2.5em;
  line-height: 1.2;
  letter-spacing: 0;
`

export const Title = styled.h3`
  ${baseStyle};

  font-family: ${themeGet('fonts.serif', 'serif')};

  font-size: 2em;
  line-height: 1.25;
  letter-spacing: 0;
`

export const Big = styled.p`
  ${baseStyle};

  font-size: 1.25em;
  line-height: 1.4;
  letter-spacing: 0;
`

export const Text = styled.p`
  ${baseStyle};

  font-size: 1em;
  line-height: 1.375;
  letter-spacing: 0;
`

export const Label = styled.label`
  ${baseStyle};

  font-size: 0.875em;
  line-height: 1;
  letter-spacing: 0;
`

export const Small = styled.small`
  ${baseStyle};

  font-size: 0.875em;
  line-height: 1.428;
  letter-spacing: 0;
`
