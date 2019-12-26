import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg``

const Mail = (props: any) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#141124" fillRule="nonzero" stroke="none" strokeWidth="1">
      <path
        d="M.474 4.376l7.088 5.511a2.75 2.75 0 003.376 0l7.098-5.52-.921-1.184-7.098 5.52a1.25 1.25 0 01-1.534 0L1.395 3.192l-.92 1.184z"
        transform="translate(.75 .75)"
      />
      <path
        d="M13.75 0a4.75 4.75 0 014.75 4.75v9a4.75 4.75 0 01-4.75 4.75h-9A4.75 4.75 0 010 13.75v-9A4.75 4.75 0 014.75 0h9zm0 1.5h-9A3.25 3.25 0 001.5 4.75v9A3.25 3.25 0 004.75 17h9A3.25 3.25 0 0017 13.75v-9a3.25 3.25 0 00-3.25-3.25z"
        transform="translate(.75 .75)"
      />
    </g>
  </Svg>
)

export default Mail
