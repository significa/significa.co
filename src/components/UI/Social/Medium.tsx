import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const Medium = (props: any) => (
  <Svg {...props} width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0h20v20H0V0zm4.773 6.689v5.938a.683.683 0 0 1-.182.59l-1.412 1.712v.225h4.002v-.225l-1.41-1.712a.708.708 0 0 1-.195-.59V7.491l3.512 7.663h.408l3.017-7.663V13.6c0 .163 0 .195-.107.301l-1.085 1.054v.225h5.27v-.225l-1.048-1.029a.313.313 0 0 1-.12-.3V6.067a.313.313 0 0 1 .12-.301l1.072-1.028v-.226h-3.713l-2.647 6.603-3.01-6.603H3.348v.226l1.254 1.51a.52.52 0 0 1 .17.44z"
      fill="#111314"
      fillRule="nonzero"
    />
  </Svg>
)

export default Medium
