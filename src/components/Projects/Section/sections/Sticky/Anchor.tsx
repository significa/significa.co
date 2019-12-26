import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  g {
    fill: ${({ theme }) => theme.colors.medium};
  }
`

const Anchor = (props: any) => (
  <Svg {...props} width="22" height="10" xmlns="http://www.w3.org/2000/svg">
    <g fill="#8A9399" fillRule="nonzero">
      <path d="M12.5 5a.5.5 0 1 1 1 0A4.5 4.5 0 0 1 9 9.5H5a4.5 4.5 0 0 1 0-9h3a.5.5 0 0 1 0 1H5a3.5 3.5 0 0 0 0 7h4A3.5 3.5 0 0 0 12.5 5z" />
      <path d="M9.5 5a.5.5 0 1 1-1 0A4.5 4.5 0 0 1 13 .5h4a4.5 4.5 0 0 1 0 9h-3a.5.5 0 1 1 0-1h3a3.5 3.5 0 0 0 0-7h-4A3.5 3.5 0 0 0 9.5 5z" />
    </g>
  </Svg>
)

export default Anchor
