import styled from '@theme'

import { Text as TextBase, Label as LabelBase } from '../../UI'

export const Wrap = styled.div`
  display: flex;
`

type Size = 'small' | 'regular'

const setFontSizeBase = ({ size }: { size: Size }) => {
  if (size === 'small') {
    return '.55rem'
  }

  return '1rem'
}

export const ImageBox = styled.div<{ size: Size }>`
  font-size: ${setFontSizeBase};
  width: 2.2em;
  height: 2.2em;
  border-radius: 2.2em;
  overflow: hidden;
  margin-right: 1em;

  .gatsby-image-wrapper,
  img {
    height: 100%;
    width: 100%;
  }
`

export const Text = styled(TextBase)`
  line-height: 1.2;
`

export const Label = styled(LabelBase)`
  display: flex;
  line-height: 1.4;

  span {
    margin: 0 0.3em;
  }

  a {
    color: inherit;
  }
`
