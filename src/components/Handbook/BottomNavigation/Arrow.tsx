import React from 'react'

const Arrow = (props: any) => (
  <svg width={15} height={11} {...props}>
    <g stroke="currentColor" strokeWidth={1.2} fill="none" fillRule="evenodd">
      <path d="M9.5 10.036L14.036 5.5 9.5.964" />
      <path d="M13.5 5.5h-12" strokeLinecap="square" />
    </g>
  </svg>
)

export default Arrow
