import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  g {
    stroke: ${({ theme }) => theme.colors.highlight};
  }
`

const Arrow = (props: any) => (
  <Svg {...props} width="14" height="10" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#111314" fill="none" fillRule="evenodd">
      <path d="M8.5.964L13.036 5.5 8.5 10.036" />
      <path d="M12.5 5.5H.5" strokeLinecap="square" />
    </g>
  </Svg>
)

export default Arrow
