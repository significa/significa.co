import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  g {
    stroke: ${({ theme }) => theme.colors.foreground};
  }
`

const Clip = (props: any) => {
  return (
    <Svg {...props} width="10" height="17" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="nonzero" stroke="#111314" fill="none">
        <path d="M6.333 5v7.333a1.333 1.333 0 1 1-2.666 0v-8" />
        <path d="M1 5V3.667a2.667 2.667 0 1 1 5.333 0V5M9 6.333v6.048a4 4 0 1 1-8 0V5" />
      </g>
    </Svg>
  )
}

export default Clip
