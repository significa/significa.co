import React from 'react'
import { ExternalLink as StyledExternalLink, ExternalIcon } from './styled'

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
