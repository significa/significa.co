import React from 'react'

/** This svg won't react to the theme */

const Arrow = (props: any) => (
  <svg {...props} width="10" height="16" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.621 2.207L2.036.793l7.242 7.243-7.242 7.242L.62 13.864 6.45 8.036z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
)

export default Arrow
