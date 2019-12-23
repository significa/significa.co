import React from 'react'

import Behance from './Behance'
import Dribbble from './Dribbble'
import Github from './Github'
import Instagram from './Instagram'
import Medium from './Medium'
import Mail from './Mail'
import Website from './Website'
import LinkedIn from './LinkedIn'
import Twitter from './Twitter'

import { SocialLink } from './styled'

const map: { [key: string]: any } = {
  behance: <Behance />,
  dribbble: <Dribbble />,
  github: <Github />,
  instagram: <Instagram />,
  medium: <Medium />,
  'professional email': <Mail />,
  'personal website': <Website />,
  linkedin: <LinkedIn />,
  twitter: <Twitter />,
}

interface ISocial {
  type: string
  link: string
}

const Social: React.FC<ISocial> = ({ type, link, ...props }) => {
  return (
    <SocialLink href={link} title={`Go to ${type}`} {...props}>
      {map[type] || null}
    </SocialLink>
  )
}

export default Social
