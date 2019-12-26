import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const QuoteIcon = (props: any) => (
  <Svg {...props} width="33" height="27" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 14h5v13H0V17C0 5 4.189 0 13 0v5c-3.25.762-4.875 3.358-5 8v1zm20 0h5v13H20V17C20 5.757 23.93 0 33 0v5c-3.25.762-4.875 3.358-5 8v1z"
      fill="#111314"
      fillRule="evenodd"
    />
  </Svg>
)

export default QuoteIcon
