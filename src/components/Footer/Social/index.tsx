import React from 'react'

import Behance from './Behance'
import Dribbble from './Dribbble'
import Github from './Github'
import Instagram from './Instagram'
import Medium from './Medium'

import { SocialLink } from './styled'

const map: { [key: string]: any } = {
  behance: <Behance />,
  dribbble: <Dribbble />,
  github: <Github />,
  instagram: <Instagram />,
  medium: <Medium />,
}

interface ISocial {
  type: string
  link: string
}

const Social: React.FC<ISocial> = ({ type, link }) => {
  return (
    <SocialLink href={link} title={`Go to ${type}`}>
      {map[type] || null}
    </SocialLink>
  )
}

export default Social
