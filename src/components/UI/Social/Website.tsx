import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  path {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

const Website = (props: any) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#141124"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      d="M14.5.75a4.75 4.75 0 014.75 4.75v9a4.75 4.75 0 01-4.75 4.75h-9A4.75 4.75 0 01.75 14.5v-9A4.75 4.75 0 015.5.75h9zm0 1.5h-9A3.25 3.25 0 002.25 5.5v9a3.25 3.25 0 003.25 3.25h9a3.25 3.25 0 003.25-3.25v-9a3.25 3.25 0 00-3.25-3.25zm-.192 4.46a.75.75 0 111.384.58l-2.512 6a.75.75 0 01-1.378.014L9.913 9.036l-1.476 4.212a.75.75 0 01-1.39.063l-2.73-6a.75.75 0 111.366-.622l1.956 4.301 1.485-4.238a.75.75 0 011.394-.056l1.95 4.408z"
    />
  </Svg>
)

export default Website
