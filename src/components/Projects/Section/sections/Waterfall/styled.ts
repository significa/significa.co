import styled from 'styled-components'
import { media } from '@theme'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-column-gap: 10em;

  ${media.large} {
    grid-column-gap: 5em;
  }

  ${media.medium} {
    grid-column-gap: 3em;
  }

  ${media.small} {
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
`

const getGridRowStart = (
  index: number,
  start: number | string
): number | string => {
  // first item always starts at 1
  if (index === 0) {
    return 1
  }

  // We only care about the second item
  if (index === 1) {
    return start
  }

  return 'auto'
}

export const ImgHolder = styled.div<{ index: number; rowSpan: number }>`
  margin-bottom: 5em;

  grid-row-end: span ${p => p.rowSpan};
  grid-row-start: ${p => getGridRowStart(p.index, 16)};

  ${media.large} {
    margin-bottom: 3em;

    grid-row-start: ${p => getGridRowStart(p.index, 12)};
  }

  ${media.medium} {
    margin-bottom: 3em;

    grid-row-start: ${p => getGridRowStart(p.index, 8)};
  }

  ${media.small} {
    margin-bottom: 1em;

    grid-row-start: ${p => getGridRowStart(p.index, 'auto')};
  }
`
