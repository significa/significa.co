import React from 'react'

import Dribbble from './bw/Dribbble'
import Medium from './bw/Medium'
import Github from './bw/Github'
import DribbbleColor from './color/Dribbble'
import MediumColor from './color/Medium'
import GithubColor from './color/Github'

import { LabsSourceType } from './types'

const icons: { [key in LabsSourceType]: React.ReactNode } = {
  dribbble: Dribbble,
  github: Github,
  medium: Medium,
}

const colorIcons: { [key in LabsSourceType]: any } = {
  dribbble: DribbbleColor,
  github: GithubColor,
  medium: MediumColor,
}

interface ILabsIcon {
  source: LabsSourceType
  color?: boolean
}

const LabsIcon: React.FC<ILabsIcon> = ({ source, color, ...props }) => {
  const Icon = color ? colorIcons[source] : icons[source]

  return <Icon {...props} />
}

export default LabsIcon
