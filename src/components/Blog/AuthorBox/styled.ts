import styled from 'styled-components'

import { Label as LabelBase, Small } from '../../UI'

export const Wrap = styled.div`
  display: flex;
  align-items: center;
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
    height: 2.5em;
    width: 2.5em;
  }
`

export const Text = styled(Small)`
  line-height: 1.4;
  display: block;
`

export const Label = styled(LabelBase)`
  display: flex;
  line-height: 1.4;

  span {
    margin: 0 0.3em;
  }

  a {
    color: inherit;
    transition: color ${({ theme }) => theme.transitions.ease()};

    &:hover {
      color: ${({ theme: { colors } }) => colors.foreground};
    }
  }
`
