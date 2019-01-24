import React from 'react'
import { Link as StyledLink, AnchorLink } from './styled'
import ExternalLink from '../ExternalLink'

interface ILinkProps {
  to: string
  children: React.ReactNode
}

const Link: React.FC<ILinkProps> = ({ to, children, ...rest }) => {
  const internal = /^\/(?!\/)/.test(to)
  const external = /^http/.test(to)

  if (internal) {
    return (
      <StyledLink to={to} {...rest}>
        {children}
      </StyledLink>
    )
  }

  if (external) {
    return (
      <ExternalLink href={to} {...rest}>
        {children}
      </ExternalLink>
    )
  }

  return (
    <AnchorLink href={to} {...rest}>
      {children}
    </AnchorLink>
  )
}

export default Link
