import React from 'react'
import styled from 'styled-components'
import { getAnyColor } from '../../../utils/getAnyColor'

interface ISegg {
  color?: string
}

const Svg = styled.svg`
  path {
    fill: ${getAnyColor};
  }
`
const Segg: React.FC<ISegg> = ({ color, ...props }) => (
  <Svg
    {...props}
    color={color}
    width="17"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 20C3.814 20 0 16.304 0 11.725 0 6.562 4.104 0 8.5 0S17 6.562 17 11.725C17 16.305 13.186 20 8.5 20zm0-1.887c3.671 0 6.632-2.869 6.632-6.388 0-4.251-3.494-9.838-6.632-9.838-3.138 0-6.632 5.587-6.632 9.838 0 3.52 2.96 6.388 6.632 6.388z"
      fillRule="nonzero"
    />
  </Svg>
)

export default Segg
