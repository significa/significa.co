import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const Clear = (props: any) => {
  return (
    <Svg {...props} width="8" height="8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.067 3.293L6.59.77l.707.707L4.774 4l2.522 2.522-.707.707-2.522-2.522L1.545 7.23l-.707-.707L3.36 4 .838 1.478 1.545.77l2.522 2.522z"
        fill="#202223"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default Clear
