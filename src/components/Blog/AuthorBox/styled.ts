import styled from '@theme'

import { Text as TextBase, Label as LabelBase } from '../../UI'

export const Wrap = styled.div`
  display: flex;
`

type Size = 'small' | 'regular'

const setFontSizeBase = ({ size }: { size: Size }) => {
  if (size === 'small') {
    return '.47rem'
  }

  return '1rem'
}

export const ImageBox = styled.div<{ size: Size }>`
  font-size: ${setFontSizeBase};
  width: 100%;
  min-width: 2.5em;
  max-width: 2.5em;
  min-height: 2.5em;
  max-height: 2.5em;
  border-radius: 2.5em;
  overflow: hidden;
  margin-right: 1em;

  .gatsby-image-wrapper,
  img {
    min-height: 100%;
    min-width: 100%;
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
