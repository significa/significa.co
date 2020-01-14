import React from 'react'

import { ExternalIcon, ExternalLink as StyledExternalLink } from './styled'

interface IExternalLink {
  children: React.ReactNode
  [key: string]: any
}

const ExternalLink: React.FC<IExternalLink> = ({ children, ...rest }) => (
  <StyledExternalLink {...rest}>
    <ExternalIcon />
    {children}
  </StyledExternalLink>
)

export default ExternalLink
