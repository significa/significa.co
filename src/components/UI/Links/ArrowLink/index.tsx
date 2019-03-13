import React from 'react'

import { Link, Arrow } from './styled'

export interface IArrowLink {
  to: string
  highlight?: boolean
  reverse?: boolean
  onClick?: () => void
}

const ArrowLink: React.FC<IArrowLink> = props => (
  <Link {...props}>
    {props.children}
    <Arrow />
  </Link>
)

export default ArrowLink
