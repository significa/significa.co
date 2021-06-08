import React from 'react'
import { select, boolean } from '@storybook/addon-knobs'

import LabsIcon from './'
import { LabsSourceType } from './types'

const sources: LabsSourceType[] = ['medium', 'github', 'dribbble']

export default {
  title: 'UI/Labs Icon',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Medium = () => <LabsIcon source="medium" />

export const MediumColor = () => <LabsIcon source="medium" color />
MediumColor.story = {
  name: 'Medium (color)',
}

export const Github = () => <LabsIcon source="github" />

export const GithubColor = () => <LabsIcon source="github" color />
MediumColor.story = {
  name: 'Github (color)',
}

export const Dribbble = () => <LabsIcon source="dribbble" />

export const DribbbleColor = () => <LabsIcon source="dribbble" color />
MediumColor.story = {
  name: 'Dribbble (color)',
}

export const All = () => (
  <LabsIcon
    source={select('Source', sources, sources[0]) as LabsSourceType}
    color={boolean('Color', false)}
  />
)
