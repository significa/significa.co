import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const LinkedIn = (props: any) => (
  <Svg {...props} width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#141124"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      d="M14.5.75a4.75 4.75 0 014.75 4.75v9a4.75 4.75 0 01-4.75 4.75h-9A4.75 4.75 0 01.75 14.5v-9A4.75 4.75 0 015.5.75h9zm0 1.5h-9A3.25 3.25 0 002.25 5.5v9a3.25 3.25 0 003.25 3.25h9a3.25 3.25 0 003.25-3.25v-9a3.25 3.25 0 00-3.25-3.25zM7.46 7.479V14H5.38V7.479h2.08zm5.533-.112c1.453 0 2.268.914 2.268 2.455V14h-2.08v-3.732c0-.756-.352-1.207-1.067-1.207-.703 0-1.125.521-1.125 1.26V14H8.915V7.479h2.016v1.224h.04c.352-.873 1.026-1.336 2.022-1.336zM6.417 4.89c.592 0 1.073.44 1.073 1.025 0 .592-.48 1.025-1.073 1.025-.586 0-1.066-.433-1.066-1.025 0-.586.48-1.025 1.066-1.025z"
    />
  </Svg>
)

export default LinkedIn
