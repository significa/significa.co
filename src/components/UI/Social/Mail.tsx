import React from 'react'
import styled from '@theme'

const Svg = styled.svg`
  path {
    stroke: ${({ theme }) => theme.colors.foreground};
  }
`

const Mail = (props: any) => (
  <Svg
    {...props}
    viewBox="2 2 16 16"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path strokeWidth={1.3} d="M3 4h14v12H3z" />
      <path strokeWidth={1.3} d="M5 6l5 5 5-5" />
    </g>
  </Svg>
)

export default Mail
