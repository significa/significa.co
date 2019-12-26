import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const Instagram = (props: any) => (
  <Svg {...props} width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <circle cx="15" cy="5" r="1" fill="#141124" />
      <path
        fill="#141124"
        fillRule="nonzero"
        d="M14.5.75a4.75 4.75 0 014.75 4.75v9a4.75 4.75 0 01-4.75 4.75h-9A4.75 4.75 0 01.75 14.5v-9A4.75 4.75 0 015.5.75h9zm0 1.5h-9A3.25 3.25 0 002.25 5.5v9a3.25 3.25 0 003.25 3.25h9a3.25 3.25 0 003.25-3.25v-9a3.25 3.25 0 00-3.25-3.25zm-4.5 3a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 1.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z"
      />
    </g>
  </Svg>
)

export default Instagram
