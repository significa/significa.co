import React from 'react'

/** This svg won't react to the theme */

const DoubleArrow = (props: any) => (
  <svg {...props} width="26" height="11" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#111314" strokeWidth="2" fill="none" fillRule="evenodd">
      <path d="M19.5.964L24.036 5.5 19.5 10.036M6.5 10.036L1.964 5.5 6.5.964" />
    </g>
  </svg>
)

export default DoubleArrow
